import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

function CreatePage() {
	const { request } = useHttp();
	const [link, setLink] = useState('');
	const { token } = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const pressHandler = async (event) => {
		if (event.key === 'Enter') {
			try {
				const data = await request(
					'/api/link/generate',
					'POST',
					{
						from: link,
					},
					{ authorization: `Bearer ${token}` }
				);
				history.push(`/detail/${data.link._id}`);
			} catch (error) {}
		}
	};

	return (
		<div className="row">
			<div className="col s8 offset-s2">
				<div className="input-field mt-3">
					<label htmlFor="link">Enter Your Link</label>
					<input
						placeholder="Insert your link"
						id="link"
						name="link"
						type="text"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
				</div>
			</div>
		</div>
	);
}

export default CreatePage;
