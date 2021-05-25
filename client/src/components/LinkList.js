import React from 'react';
import { Link } from 'react-router-dom';

function LinkList({ links }) {
	if (!links.length) {
		return <h3 className="center">There are no links yet</h3>;
	}

	return (
		<table>
			<thead>
				<tr>
					<th>№</th>
					<th>Original</th>
					<th>Shorten</th>
					<th>Open</th>
				</tr>
			</thead>

			<tbody>
				{links.map((link, i) => {
					return (
						<tr key={link._id}>
							<td>{i + 1}</td>
							<td>{link.from}</td>
							<td>{link.to}</td>
							<td>
								<Link to={`/detail/${link._id}`}>Open</Link>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default LinkList;
