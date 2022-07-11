const Index = () => {
	return (
		<>
			<div
				style={{ width: '100%', height: '100vh', display: 'flex', backgroundColor: 'red' }}
			>
				<div className="left" style={{ height: '100%', display: 'flex' }}>
					<div
						className="sidebar"
						style={{
							width: '80px',
							height: '100%',
							backgroundImage:
								'linear-gradient(-225deg, #5271c4 0%, #b19fff 48%, #eca1fe 100%)',
							display: 'flex',
						}}
					>
						<div
							className="wrapper"
							style={{
								height: '100vh',
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
							}}
						>
							<img src="https://i.ibb.co/L8D5T60/light.png" />
							<img src="https://i.ibb.co/zmDbMVZ/diamond.png" />
							<img src="https://i.ibb.co/W5QZ9Fk/envelope.png" />
							<img src="https://i.ibb.co/CnKDBxC/flask.png" />
							<img src="https://i.ibb.co/MGs4Fyn/sent-mail.png" />
							<img src="https://i.ibb.co/zGtDpcp/map.png" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
