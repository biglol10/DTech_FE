import crypto from 'crypto';

const baseImage = {
	AvatarBase0: 'AvatarBase_BLACK1.png',
	AvatarBase1: 'AvatarBase_SKYBLUE1.png',
	AvatarBase2: 'AvatarBase_BLUE1.png',
	AvatarBase3: 'AvatarBase_BLUE2.png',
	AvatarBase4: 'AvatarBase_GREEN1.png',
	AvatarBase5: 'AvatarBase_GREEN2.png',
	AvatarBase6: 'AvatarBase_PURPLE1.png',
	AvatarBase7: 'AvatarBase_YELLOW2.png',
	AvatarBase8: 'AvatarBase_RED1.png',
	AvatarBase9: 'AvatarBase_RED2.png',
};

const generateUID = () => {
	return crypto.randomBytes(20).toString('hex').substring(0, 20);
};

const generateImageUID = () => {
	return crypto.randomBytes(20).toString('hex').substring(0, 25);
};

const generateAvatarImage = (uid: string) => {
	const extractNumbers = uid.replace(/\D/g, '');

	let summation = 0;

	for (let index = 0; index < extractNumbers.length; index++) {
		summation += parseInt(extractNumbers[index], 10);
	}

	const baseChoice = `AvatarBase${summation % 10}` as keyof typeof baseImage;

	return `${process.env.NODE_ENV === 'production' ? '/dtech' : ''}/images/AvatarBaseImage/${
		baseImage[baseChoice]
	}`;
};

export { generateUID, generateImageUID, generateAvatarImage };
