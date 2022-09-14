import { MainLayoutTemplate } from '@components/customs';
import { Button, Card, Image, Table, Header } from 'semantic-ui-react';

import Style from './about.module.scss';

const About = () => {
	return (
		<div className={Style['aboutMain']}>
			<div style={{ width: '60%', margin: '0 auto' }}>
				<Card.Group>
					<Card fluid>
						<Card.Content>
							<Card.Header>DTech App</Card.Header>
							<Card.Meta>
								팀과 팀원의 스킬현황을 파악하고 정보공유를 할 수 있는 앱입니다
							</Card.Meta>
							<Card.Description>
								<Table basic="very" celled collapsing>
									<Table.Body>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Header.Subheader>
														Human Resources
													</Header.Subheader>
												</Header>
											</Table.Cell>
											<Table.Cell>22</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Image
														src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
														rounded
														size="mini"
													/>
													<Header.Content>
														Matthew
														<Header.Subheader>
															Fabric Design
														</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>15</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Image
														src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
														rounded
														size="mini"
													/>
													<Header.Content>
														Lindsay
														<Header.Subheader>
															Entertainment
														</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>12</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>
												<Header as="h4" image>
													<Image
														src="https://react.semantic-ui.com/images/avatar/small/mark.png"
														rounded
														size="mini"
													/>
													<Header.Content>
														Mark
														<Header.Subheader>
															Executive
														</Header.Subheader>
													</Header.Content>
												</Header>
											</Table.Cell>
											<Table.Cell>11</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
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
							<Image
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
							<Image
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
					</Card>
				</Card.Group>
			</div>
		</div>
	);
};

About.PageLayout = MainLayoutTemplate;
About.displayName = 'about';

export default About;
