import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

let Pagination = ({total,page,perPage,className}) => {

	let next = page * perPage < total
	let prev = page > 1
	let array = []

	for (let i = 1; i <= Math.ceil(total / perPage); i++) {
		array.push(i)
	}

	let isFirst = page === 1
	let isLast = page === array[array.length - 1]

	let prevPage = isLast ? (page - 1) - 2 : (page - 1) - 1
	let nextPage = isFirst ? page + 2 : page + 1

	return(
		<nav className={className}>
			<ul className="pagination">
				
				<li className={["page-item", !prev && 'disabled'].join(' ')}><Link to={{ pathname: '/', search: `?page=${parseInt(page - 1)}` }} className="page-link">Anterior</Link></li>

				{
					array.slice(isFirst ? 0 : prevPage, nextPage).map(num => (
						<li className={["page-item", num === page && 'active'].join(' ')} key={num}><Link to={{ pathname: '/', search: `?page=${num}`}} className="page-link">{num}</Link></li>
					))
				}
				
			   
				<li className={["page-item", !next && 'disabled'].join(' ')}><Link to={{ pathname: '/', search: `?page=${parseInt(page + 1)}` }} className="page-link">Siguiente</Link></li>
			</ul>
		</nav>
	)

}

Pagination.defaultProps = {
	className : ''
}

Pagination.propTypes = {
	className : PropTypes.string,
	page:PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	perPage: PropTypes.number.isRequired
}

export default Pagination;