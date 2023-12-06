import {useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../../axiosApi';
import {PageDetails} from '../../types';

const Pages = () => {
  const [page, setPage] = useState<PageDetails| null>(null);
  const {pageName} = useParams();
  const [loading, setLoading] = useState(true);

  const fetchOnePage= useCallback( async() => {
    try {
      const pageResponse = await axiosApi.get('pages/' + pageName + '.json');
      setPage(pageResponse.data);
    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchOnePage();
  }, [fetchOnePage]);


  return (
    <div className="m-5">
      <div className="fs-5 fw-bold">
        {page?.title}
      </div>
      <div className="bg-info mt-3">
        {page?.content}
      </div>
    </div>
  );
};

export default Pages;