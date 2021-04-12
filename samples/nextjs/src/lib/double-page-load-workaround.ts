import { useRouter } from 'next/router'

// Next.js has a bug that causes a page to loaded twice if query parameters are specified
export function areQueryParamsReady(): boolean {
    const router = useRouter();

    const minQueryLength = router.query.path !== undefined ? 2 : 1;

    const index = router.asPath.indexOf('?');
    return index < 0 || router.asPath.length === index + 1 || Object.keys(router.query).length >= minQueryLength;
}