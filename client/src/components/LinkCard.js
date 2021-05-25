import React from 'react';

function LinkCard({ link }) {
	return (
		<div className="col s12 m7">
			<h2 className="header">Link Info</h2>
			<div className="card horizontal">
				<div className="card-stacked">
					<div className="card-content">
						<p>
							Your Link:{' '}
							<a href={link.to} target="_blank" rel="noopener noreferrer">
								{link.to}
							</a>
						</p>
						<p>
							Original Link:{' '}
							<a href={link.from} target="_blank" rel="noopener noreferrer">
								{link.from}
							</a>
						</p>
						<p>
							Clicked times : <strong>{link.clicks}</strong>
						</p>

						<p>
							Date : <strong>{new Date(link.date).toLocaleDateString()}</strong>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LinkCard;
