import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Loader from '../components/Loader';
import LinkList from '../components/LinkList';

function LinksPage() {
	const [links, setlikns] = useState([]);
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request('/api/link', 'GET', null, {
				authorization: `Bearer ${token}`,
			});
			setlikns(fetched);
		} catch (error) {}
	}, [token, request]);

	useEffect(() => {
		fetchLinks();
	}, [fetchLinks]);

	if (loading) {
		return <Loader />;
	}

	return <>{!loading && <LinkList links={links} />}</>;
}

export default LinksPage;
