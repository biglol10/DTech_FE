import { ISNSkillFlow } from '@utils/types/componentTypes';
import { TNSkill } from '@components/index';
import { elCommStyle } from '@utils/styleRelated/stylehelper';
import Style from './Thumbnail.module.scss';

const TNSkillFlow = ({ id = 'd', spacing = 0, items = [] }: ISNSkillFlow) => {
	return (
		<>
			<div className={Style['skillFlowFrame']} style={elCommStyle(spacing)}>
				<div id={id} className={Style['skillFlow']}>
					{items.map((item) => (
						<TNSkill key={item.id} name={item.name} />
					))}
				</div>
			</div>
		</>
	);
};

TNSkillFlow.displayName = 'SkillFlow';

export default TNSkillFlow;
