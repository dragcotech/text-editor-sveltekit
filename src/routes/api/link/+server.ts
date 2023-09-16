import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const href = url.searchParams.get('url');
	if (!href) {
		return json('Invalid Url', { status: 400 });
	}
	const res = await fetch(href);
	const htmlContent = await res.text();

	const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
	const title = titleMatch ? titleMatch[1] : '';
	const descriptionMatch = htmlContent.match(/<meta name="description" content="(.*?)"/);
	const description = descriptionMatch ? descriptionMatch[1] : '';
	const imageMatch = htmlContent.match(/<meta property="og:image" content="(.*?)"/);
	const imageUrl = imageMatch ? imageMatch[1] : '';
	return json({
		success: 1,
		meta: {
			title,
			description,
			image: {
				url: imageUrl
			}
		}
	});
};
