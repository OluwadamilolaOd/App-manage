import React, { useState } from 'react';

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('body', formData.body);
      formDataObj.append('file', formData.file);

      const response = await fetch('https://example.com/api/posts', {
        method: 'POST',
        body: formDataObj,
      });

      // Handle the response
      if (response.ok) {
        console.log('Post created successfully!');
      } else {
        console.log('Error creating post!');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="body">Body</label>
      <textarea
        id="body"
        name="body"
        value={formData.body}
        onChange={handleChange}
      />

      <label htmlFor="file">File</label>
      <input
        type="file"
        id="file"
        name="file"
        onChange={handleChange}
      />

      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
