import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {PageDetails} from '../../types';
import axiosApi from '../../../axiosApi';

const EditForm = () => {
  const {pageName} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [newPage, setNewPage] = useState<PageDetails>({
    title: '',
    content: '',
  });
  const [selectedValue, setSelectedValue] = useState('');

  const pageChanged = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      setNewPage(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const fetchPage = useCallback( async() => {
    try {
      if (selectedValue) {
        const url = `pages/${selectedValue}.json`;
        const pageResponse = await axiosApi.get(url);
        setNewPage(pageResponse.data);
      }

    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);
  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await  axiosApi.put(`pages/${selectedValue}.json`,newPage);
    navigate(`/pages/${selectedValue}`);
  };

  const editPage = useCallback(async () => {
    const url = `pages/${selectedValue}.json`;
    const response = await axiosApi.get(url);
    const data: PageDetails = response.data;
    setNewPage(data);
  }, [selectedValue]);

  useEffect(() => {
      void editPage();
  }, [selectedValue,editPage]);

  const form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="PageName" className="me-3">Select page: </label>
        <select className="form-control" id="pageName" name="pageName"  required value={selectedValue} onChange={handleSelectChange}>
          <option value=""> </option>
          <option value='home'>Home</option>
          <option value='about'>About</option>
          <option value='contacts'>Contacts</option>
          <option value='quotes'>Quotes</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="Title">Title:</label>
        <input
          id="title" type="text" name="title" required
          className="form-control"
          value={newPage?.title}
          onChange={pageChanged}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="Content">Content:</label>
        <input
          id="content" type="text" name="content" required
          className="form-control"
          value={newPage?.content}
          onChange={pageChanged}
        />
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary m-3">
        Save
      </button>
    </form>
  );
  return (
    <div>
      <h3 className="m-3">Edit pages</h3>
      {form}
    </div>
  );
};

export default EditForm;