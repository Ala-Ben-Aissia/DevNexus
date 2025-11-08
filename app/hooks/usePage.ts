import {useSearchParams} from 'react-router'

export function usePage<T>({list, perPage}: {list: T[]; perPage: number}) {
	const [searchParams, setSearchParams] = useSearchParams()
	// perPage = perPage <= 0 ? PER_PAGE : perPage
	// const totalPages = Math.max(1, Math.ceil(list.length / perPage))
	const page = +(searchParams.get('page') || 1)

	const onPageChange = (newPage: number) => {
		if (newPage < 1) newPage = 1
		if (newPage === page) return
		const params = new URLSearchParams(searchParams)
		params.set('page', String(newPage))
		setSearchParams(params)
	}

	const goNext = () => onPageChange(page + 1)
	const goPrev = () => onPageChange(page - 1)

	const start = perPage * (page - 1)
	const items = list.slice(start, start + perPage)

	return {goNext, goPrev, onPageChange, items}
}
