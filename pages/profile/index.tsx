import { MainLayoutTemplate } from '@components/customs';
import Style from './profile.module.scss';

const Profile = () => {
	return (
		<div>
			<div className={Style['profileCard']}>
				<div className={Style['profileTop']}>
					<div className={Style['profileTopLeft']}>left</div>
					<div className={Style['profileTopRight']}>right</div>
				</div>
			</div>
		</div>
	);
};

Profile.PageLayout = MainLayoutTemplate;
Profile.displayName = 'profile';

export default Profile;
