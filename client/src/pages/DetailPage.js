import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import LinkCard from '../components/LinkCard';

function DetailPage() {
	const { token } = useContext(AuthContext);
	const { loading, request } = useHttp();
	const [link, setLink] = useState(null);
	const linkId = useParams().id;

	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
				authorization: `Bearer ${token}`,
			});
			setLink(fetched);
		} catch (error) {}
	}, [token, linkId, request]);

	useEffect(() => {
		getLink();
	}, [getLink]);

	if (loading) {
		return <Loader />;
	}

	return <>{!loading && link && <LinkCard link={link} />}</>;
}

export default DetailPage;
