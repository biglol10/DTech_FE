/** ****************************************************************************************
 * @설명 : 스킬 대시보드 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-27   feature/JW/dashbaord       최초작성
 ********************************************************************************************/

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Label, InputLayout, InputDropdown, InputSearch, SharpDivider } from '@components/index';
import { techImage } from '@utils/constants/techs';
import { SkillTable, PersonCard, MainLayoutTemplate } from '@components/customs';
import Style from './dashboard.module.scss';

interface ITeamSkillData {
	subject: string;
	count: number;
}

const fullData = [
	{
		username: '김민준',
		profileUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJfa758-9Zet25uR43OnWUDxPh_5ivrKWg4g&usqp=CAU',
		rank: '선임',
		skills: 'React, Typescript, Node, Express, Docker, SCSS, Jquery, ASPNET',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '이서준',
		profileUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9gh2o25reFKIFBplALOC5DV0ssXpCzpMUUw&usqp=CAU',
		rank: '책임',
		skills: 'React, Node',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '박도윤',
		profileUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkhef03Xe6hgwxJvOOFeOJQT71NbRrMU34Q&usqp=CAU',
		rank: '선임',
		skills: 'Vue, Typescript',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '김서연',
		profileUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvW6vwSP5lsCwSj0SF9tR1BrepyNDaCaT2uw&usqp=CAU',
		rank: '사원',
		skills: 'Spring, Express',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '박서윤',
		profileUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo4zGSr25cTfr__JnNBlxju18g9geM7uir_g&usqp=CAU',
		rank: '선임',
		skills: 'SCSS, Jquery',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '최시우',
		profileUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFs5aIbWSFMQUksiZE2k40CzeAcb5RC7P_g&usqp=CAU',
		rank: '책임',
		skills: 'Docker, ASPNET',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '곽주원',
		profileUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu7fWIFm7j2Oz0gFHTNp1fskSWJDbi_EUD2Q&usqp=CAU',
		rank: '사원',
		skills: 'React, Express',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '이지은',
		profileUrl:
			'data:image/jpeg;base64,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',
		rank: '선임',
		skills: 'Typescript, Node',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
	{
		username: '이하은',
		profileUrl:
			'data:image/jpeg;base64,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',
		rank: '사원',
		skills: 'Spring, Node',
		domains: '금융, 공공',
		githubUrl: 'https://github.com/biglol10',
		detail: 'DCX모바일 기술팀 FE 개발자로 일하고 있습니다. DCX모바일 기술팀 FE 개발자로 일하고 있습니다.',
	},
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Index = ({ teamSkillData, aProp }: { teamSkillData: ITeamSkillData[]; aProp: string }) => {
	const router = useRouter();

	const data = {
		labels: teamSkillData.map((item) => item.subject),
		datasets: [
			{
				label: 'asdf',
				data: teamSkillData.map((item) => item.count),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,

		plugins: {
			title: {
				display: false,
				text: 'DCX 센터 스킬 현황',
			},
			legend: {
				position: 'top' as const,
				display: false,
			},
		},
	};

	const options3 = useMemo(() => {
		const techArr: any = [{ key: '전체', text: '전체', value: '전체' }];

		Object.keys(techImage).map((item) => {
			const itemString = item as keyof typeof techImage;

			techArr.push({
				key: item,
				text: item,
				value: item,
				image: techImage[itemString],
			});

			return null;
		});

		return techArr;
	}, []);

	const [searchCondition, setSearchCondition] = useState({
		skillset: '전체',
		personname: '',
		rank: '',
	});

	const [userListData, setUserListData] = useState<typeof fullData>(fullData);

	const tempArr = useRef<typeof fullData>(fullData);

	const inputSearchRef = useRef<any>();

	useEffect(() => {
		setUserListData(
			searchCondition.rank
				? tempArr.current.filter((item) => item.rank === searchCondition.rank)
				: tempArr.current,
		);
	}, [searchCondition.rank]);

	const enterSearch = useCallback(() => {
		const filteredData = fullData.filter((item) => {
			if (searchCondition.personname && searchCondition.skillset !== '전체') {
				return (
					item.username.includes(searchCondition.personname) &&
					item.skills.includes(searchCondition.skillset)
				);
			} else if (searchCondition.personname) {
				return item.username.includes(searchCondition.personname);
			} else if (searchCondition.skillset !== '전체') {
				return item.skills.includes(searchCondition.skillset);
			} else {
				return item;
			}
		});

		tempArr.current = filteredData;

		setUserListData(filteredData);
	}, [searchCondition]);

	return (
		<>
			<div className={Style['dashboardTopMain']}>
				<div className={Style['skillOverview']}>
					<Label
						iconOrImage="image"
						nextImage={
							<img src="https://www.lgcns.com/wp-content/uploads/2022/03/img_dcx_introduceLogo-1.png" />
						}
						content="DCX 센터 스킬 현황"
						size="large"
					/>
					<br />
					<Bar options={options} data={data} />
				</div>
				<div className={Style['skillOverviewTable']}>
					<SkillTable teamSkillData={teamSkillData} />
				</div>
			</div>
			<div className={Style['dashboardBottomMain']}>
				<div className={Style['skillConditionWrap']}>
					<InputLayout
						id={Style['dropdownLayout']}
						inputLabel="dropdown"
						inputLabelSize="h4"
						showInputLabel={false}
					>
						<InputDropdown
							id={Style['inputDropdown']}
							placeholder="선택해주세요"
							value={searchCondition.skillset}
							options={options3}
							onChange={(value: { value: string }) => {
								setSearchCondition((prev) => ({ ...prev, skillset: value.value }));
								setTimeout(() => {
									inputSearchRef.current.focus();
								}, 100);
							}}
						/>
					</InputLayout>
					<InputLayout inputLabel="" showInputLabel={false}>
						<InputSearch
							id="inputPerson"
							ref={inputSearchRef}
							placeholder="인물 검색"
							value={searchCondition.personname}
							onChange={({ value }: { value: string }) => {
								setSearchCondition((prev) => ({ ...prev, personname: value }));
							}}
							onEnter={enterSearch}
						/>
					</InputLayout>
					<ul>
						<li
							className={searchCondition.rank === '사원' ? Style['active'] : ''}
							onClick={() =>
								setSearchCondition((prev) => ({
									...prev,
									rank: `${prev.rank === '사원' ? '' : '사원'}`,
								}))
							}
						>
							사원
						</li>
						<li
							className={searchCondition.rank === '선임' ? Style['active'] : ''}
							onClick={() =>
								setSearchCondition((prev) => ({
									...prev,
									rank: `${prev.rank === '선임' ? '' : '선임'}`,
								}))
							}
						>
							선임
						</li>
						<li
							className={searchCondition.rank === '책임' ? Style['active'] : ''}
							onClick={() =>
								setSearchCondition((prev) => ({
									...prev,
									rank: `${prev.rank === '책임' ? '' : '책임'}`,
								}))
							}
						>
							책임
						</li>
					</ul>
					<div>
						<h4>{userListData.length}명</h4>
					</div>
				</div>
				<SharpDivider content="" />
				<div className={Style['peopleCardArea']}>
					{userListData.map((item, idx) => (
						<PersonCard
							key={`personcard_${idx}`}
							username={item.username}
							profileUrl={item.profileUrl}
							rank={item.rank}
							skills={item.skills}
							domains={item.domains}
							githubUrl={item.githubUrl}
							detail={item.detail}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (context: any) => {
	const { token } = parseCookies(context);

	const axiosData = await axios
		.get('http://localhost:3066/api/dashboard/getTeamSkills', {
			headers: { Authorization: token },
		})
		.then((response) => {
			return response.data.teamSkillData;
		})
		.catch((err) => {
			return [];
		});

	return {
		props: {
			teamSkillData: axiosData,
			aProp: process.env.S3_URL,
		},
	};
};

Index.PageLayout = MainLayoutTemplate;
Index.displayName = 'dashboard';

export default Index;
