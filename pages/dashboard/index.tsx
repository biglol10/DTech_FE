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
import { techImage } from '@utils/constants/imageConstants';
import { SkillTable, PersonCard, MainLayoutTemplate } from '@components/customs';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import _ from 'lodash';

import Style from './dashboard.module.scss';

interface ITeamSkillCountObj {
	[val: string]: {
		SKILL_NM: string;
		SKILL_CNT: number;
		USER_INFO: {
			USER_NM: string[];
			USER_UID: string[];
			IMG_URL: string[];
			TEAM_CD: string[];
			USER_TITLE: string[];
		};
	};
}

interface ITeamSkillDashboard {
	TECH_CNT: number;
	DETAIL: string;
	TECH_NM: string;
	PAGE_URL: string;
	TECH_CD: string;
}

interface IUserDashboard {
	USER_DETAIL: string | null;
	USER_DOMAIN: string | null;
	GITHUB_URL: string | null;
	USER_IMG_URL: string | null;
	USER_PHONENUM: string | null;
	PRJ_DETAIL: string | null;
	USER_TEAM_CD: string;
	TECH_ARR: string[];
	USER_TITLE: string;
	USER_ID: string;
	USER_NAME: string;
	USER_UID: string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Index = ({
	aProp,
	teamSkillDashboard,
	userDashboard,
	teamSkillCountObj,
	userToken,
}: {
	aProp: string;
	teamSkillDashboard: ITeamSkillDashboard[];
	userDashboard: IUserDashboard[];
	teamSkillCountObj: ITeamSkillCountObj;
	userToken: string;
}) => {
	const router = useRouter();
	const [inputLoading, setInputLoading] = useState(false);

	const data = {
		labels: teamSkillDashboard.map((item) => item.TECH_NM),
		datasets: [
			{
				label: 'asdf',
				data: teamSkillDashboard.map((item) => item.TECH_CNT),
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

	const [userListData, setUserListData] = useState<typeof userDashboard>(userDashboard);

	const tempArr = useRef<typeof userDashboard>(userDashboard);

	const inputSearchRef = useRef<any>();

	const enterSearch = useCallback(() => {
		setInputLoading(true);
		if (userToken) {
			axios
				.post(
					'http://localhost:3066/api/dashboard/getUserSkillFilter',
					{
						filterSkill: searchCondition.skillset,
						filterName: searchCondition.personname,
					},
					{ headers: { Authorization: userToken } },
				)
				.then((response) => {
					tempArr.current = response.data.filterdUsersList;
					setUserListData(response.data.filterdUsersList);
				})
				.catch((err) => {
					toast['error'](<>{'데이터를 가져오지 못했습니다'}</>);
				});
		}
		setInputLoading(false);
	}, [searchCondition.personname, searchCondition.skillset, userToken]);

	useEffect(() => {
		setUserListData(
			searchCondition.rank
				? tempArr.current.filter((item) => item.USER_TITLE === searchCondition.rank)
				: tempArr.current,
		);
	}, [searchCondition.rank]);

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
					<SkillTable teamSkillData={teamSkillCountObj} />
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
							loading={inputLoading}
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
						<h4>
							<CountUp end={userListData.length} delay={0} duration={0.2} />명
						</h4>
					</div>
				</div>
				<SharpDivider content="" />
				<div className={Style['peopleCardArea']}>
					{userListData.map((singleUser, idx) => {
						return (
							<PersonCard
								key={`personCard_${singleUser.USER_ID}`}
								username={singleUser.USER_NAME}
								profileUrl={singleUser.USER_IMG_URL}
								rank={singleUser.USER_TITLE}
								skills={singleUser.TECH_ARR.join()}
								domains={singleUser.USER_DOMAIN || ''}
								githubUrl={singleUser.GITHUB_URL || ''}
								detail={singleUser.USER_DETAIL || ''}
								userUID={singleUser.USER_UID}
							/>
						);
					})}
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
			console.log('responsedata is ');
			console.log(response.data);
			return response.data;
		})
		.catch((err) => {
			return {
				teamSkillDashboard: null,
				teamSkillCountObj: {},
				userDashboard: [],
			};
		});

	const teamSkillCountObj: any = {};

	if (!_.isEmpty(axiosData.teamSkillCountObj)) {
		const tempData: any = axiosData.teamSkillCountObj;

		Object.keys(tempData).map((item, idx) => {
			const tempSkillObj = tempData[item];

			teamSkillCountObj[item] = {
				SKILL_NM: tempSkillObj[0].TECH_NM,
				SKILL_CNT: tempSkillObj[0].TECH_CNT,
				USER_INFO: tempSkillObj.reduce((previousVal: object[], currentVal: any) => {
					const obj = {
						USER_NM: currentVal.USER_NM,
						USER_UID: currentVal.USER_UID,
						IMG_URL: currentVal.USER_IMG_URL,
						TEAM_CD: currentVal.TEAM_CD,
						USER_TITLE: currentVal.USER_TITLE,
					};

					previousVal.push(obj);
					return previousVal;
				}, []),
			};

			return null;
		});
	}

	return {
		props: {
			teamSkillDashboard: axiosData.teamSkillDashboard,
			userDashboard: axiosData.userDashboard,
			teamSkillCountObj,
			aProp: process.env.S3_URL,
		},
	};
};

Index.PageLayout = MainLayoutTemplate;
Index.displayName = 'dashboard';

export default Index;
