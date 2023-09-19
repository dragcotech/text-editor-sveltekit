import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
	const { subid, postid } = params;
	console.log(subid, postid);
};
