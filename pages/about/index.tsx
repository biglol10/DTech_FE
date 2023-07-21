import { MainLayoutTemplate } from '@components/customs';
import { Card, Table, Header } from 'semantic-ui-react';
import Image from 'next/image';

import DLogo from '@public/images/DLogo2.png';
import Person1 from '@public/images/AvatarBaseImage/AvatarBase_GREEN1.png';
import SkillListSvg from '@styles/svg/skillList.svg';
import NpmSvg from '@styles/svg/npm.svg';
import PresentationSvg from '@styles/svg/presentation.svg';
import CheckSvg from '@styles/svg/check.svg';
import PeopleSvg from '@styles/svg/people.svg';
import UserRoleSvg from '@styles/svg/userRole.svg';
import GithubSvg from '@styles/svg/github.svg';
import StorybookSvg from '@styles/svg/storybook.svg';
import PostmanSvg from '@styles/svg/postman.svg';

import Style from './about.module.scss';

// https://www.svgrepo.com/

const About = () => {
	return (
		<div className={Style['aboutMain']}>
			<div>
				<Card.Group>
					{/* 프로젝트 정보 */}
					<Card fluid>
						<Card.Content className={Style['cardContent']}>
							<Image src={DLogo} width={35} height={35} />
							<Card.Header>DTech App</Card.Header>
							<Card.Meta>팀과 팀원의 스킬현황을 파악하고 정보공유를 할 수 있는 웹입니다</Card.Meta>
							<Card.Description>
								<Table basic="very" celled collapsing>
									<Table.Body>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<SkillListSvg />
															Skill-Set
														</div>

														<Header.Subheader>사용한 기술스택</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												<b>[FE]</b> React, Nextjs, Typescript, Redux-Toolkit, Redux-saga, Socket, SASS/SCSS
												<br />
												<b>[BE]</b> Express, Typescript, Socket, AWS-S3, MYSQL
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<NpmSvg />
															Packages
														</div>

														<Header.Subheader>사용한 주요 패키지</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												Redux-toolkit, Redux-Saga, Lodash, Chartjs, React-toastify, React-Quill, Axios, Classnames, Dayjs, Semantic-ui-react,
												Socket-IO
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<PresentationSvg />
															Value
														</div>

														<Header.Subheader>개발목적</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												팀이 나뉘고 새로운 인원들이 들어오면서 서로에 대해 잘 모르며 질문이 있을 때 누구에게 여쭤봐야 하는지 모르는 경우가 많았을
												겁니다. DTech App은 이런 문제를 조금이라도 해결하기를 기대하며 만들었습니다.
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<CheckSvg />
															Features
														</div>

														<Header.Subheader>제공하는 기능</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												팀 스킬 현황, 유저검색, 스킬 별 인원 통계, 실시간 채팅, 그룹채팅, 읽지않은 메시지, 이미지 업로드, 링크 메타데이터 제공,
												질의응답 게시판, 댓글/좋아요
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<StorybookSvg />
															Storyook
														</div>

														<Header.Subheader>링크</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												<a href="http://43.200.144.147:6006/?path=/story/example-introduction--page" target="_blank" rel="noreferrer">
													http://43.200.144.147:6006/
												</a>
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<PostmanSvg />
															Postman
														</div>

														<Header.Subheader>링크</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												<a href="https://documenter.getpostman.com/view/14863756/2s8YRjptSi" target="_blank" rel="noreferrer">
													https://documenter.getpostman.com/view/14863756/2s8YRjptSi
												</a>
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<PeopleSvg />
															Creators
														</div>

														<Header.Subheader>개발 인원</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>변지욱 선임 (Frontend developer), 장보영 선임 (Frontend developer)</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Card.Description>
						</Card.Content>
					</Card>

					{/* 변지욱 선임 정보 */}
					<Card fluid>
						<Card.Content className={Style['cardContent']}>
							<Image src={Person1} width={35} height={35} />
							<Card.Header>변지욱 (선임)</Card.Header>
							<Card.Meta>Front-end Developer</Card.Meta>
							<Card.Description>
								<Table basic="very" celled collapsing>
									<Table.Body>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<UserRoleSvg />
															Role
														</div>

														<Header.Subheader>프로젝트에서의 역할</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>Main developer, FE &#38; BE 메인 개발</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<SkillListSvg />
															Contribution
														</div>

														<Header.Subheader>기여한 부분</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												<b>[FE]</b> 프로젝트 환경설정 (Layout, Redux, Storybook, Webpack, Typescript, ESLint, Custom-Hooks, 공통함수), 팀 스킬
												대시보드 화면 개발, 로그인 + 채팅 + About 페이지 개발
												<br />
												<b>[BE]</b> 백엔드 환경설정 (Node Express구성, AsyncHandler, ErrorHandler, MYSQL연결, Socket IO), 로그인/채팅/대시보드 관련
												api 개발, 메타데이터 fetch기능 개발
												<br />
												<b>[기타]</b> 프로젝트 기획, 디자인, 개발환경 및 툴 수립, AWS 구성 (EC2, CloudFront, CloudWatch, ACM, Route 53)
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<GithubSvg />
															Github, <br /> 연락처
														</div>

														<Header.Subheader>Github &#38; Email</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												<a href={'https://github.com/biglol10'} target="_blank" rel="noopener noreferrer">
													https://github.com/biglol10
												</a>
												<span style={{ margin: '0 10px', fontWeight: 'bold' }}>/</span>
												<span>jiwookbyun@lgcns.com</span>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Card.Description>
						</Card.Content>
					</Card>

					{/* 장보영 선임 정보 */}
					<Card fluid>
						<Card.Content className={Style['cardContent']}>
							<Image src={Person1} width={35} height={35} />
							<Card.Header>장보영 (선임)</Card.Header>
							<Card.Meta>Front-end Developer</Card.Meta>
							<Card.Description>
								<Table basic="very" celled collapsing>
									<Table.Body>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<UserRoleSvg />
															Role
														</div>

														<Header.Subheader>프로젝트에서의 역할</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>Main developer, FE &#38; BE 메인 개발</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<SkillListSvg />
															Contribution
														</div>

														<Header.Subheader>기여한 부분</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												<b>[FE]</b> 게시판 + 회원가입 + 프로필 페이지 개발
												<br />
												<b>[BE]</b> 백엔드 환경설정(multer S3 Upload), 회원가입 + 게시판 관련 api 개발, AWS 구성(RDS(MYSQL), S3, IAM ), DB(MYSQL) 관리
												<br />
												<b>[기타]</b> 프로젝트 기획, 디자인
											</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Content>
														<div className={Style['subTitleDivWithSVG']}>
															<GithubSvg />
															Github, <br /> 연락처
														</div>

														<Header.Subheader>Github &#38; Email</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>
												<a href={'https://github.com/biglol10'} target="_blank" rel="noopener noreferrer"></a>
												<span style={{ margin: '0 10px', fontWeight: 'bold' }}>/</span>
												<span>by5242@lgcns.com</span>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Card.Description>
						</Card.Content>
					</Card>

					{/* <Card fluid>
						<Card.Content>
							<SemanticImage
								floated="right"
								size="mini"
								src="/images/avatar/large/molly.png"
							/>
							<Card.Header>Molly Thomas</Card.Header>
							<Card.Meta>New User</Card.Meta>
							<Card.Description>
								Molly wants to add you to the group <strong>musicians</strong>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<div className="ui two buttons">
								<Button basic color="green">
									Approve
								</Button>
								<Button basic color="red">
									Decline
								</Button>
							</div>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<SemanticImage
								floated="right"
								size="mini"
								src="/images/avatar/large/jenny.jpg"
							/>
							<Card.Header>Jenny Lawrence</Card.Header>
							<Card.Meta>New User</Card.Meta>
							<Card.Description>
								Jenny requested permission to view your contact details
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<div className="ui two buttons">
								<Button basic color="green">
									Approve
								</Button>
								<Button basic color="red">
									Decline
								</Button>
							</div>
						</Card.Content>
					</Card> */}
				</Card.Group>
			</div>
		</div>
	);
};

About.PageLayout = MainLayoutTemplate;
About.displayName = 'about';

export default About;
