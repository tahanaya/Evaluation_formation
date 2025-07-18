import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ModuleForm = ({ isOpen, onClose, onSubmit, module, formations }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    hours: 0,
    credits: 0,
    formationId: formations.length > 0 ? formations[0].id : 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title,
        description: module.description,
        code: module.code,
        hours: module.hours,
        credits: module.credits,
        formationId: module.formationId
      });
    } else {
      setFormData({
        title: '',
        description: '',
        code: '',
        hours: 0,
        credits: 0,
        formationId: formations.length > 0 ? formations[0].id : 0
      });
    }
  }, [module, formations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'hours' || name === 'credits' ? parseInt(value) : value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.code.trim()) newErrors.code = 'Code is required';
    if (formData.hours <= 0) newErrors.hours = 'Hours must be positive';
    if (formData.credits <= 0) newErrors.credits = 'Credits must be positive';
    if (!formData.formationId) newErrors.formationId = 'Formation is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {module ? 'Edit Module' : 'Add New Module'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : 'border'}`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Code *
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.code ? 'border-red-500' : 'border'}`}
                />
                {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
              </div>

              <div>
                <label htmlFor="formationId" className="block text-sm font-medium text-gray-700">
                  Formation *
                </label>
                <select
                  id="formationId"
                  name="formationId"
                  value={formData.formationId}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.formationId ? 'border-red-500' : 'border'}`}
                >
                  {formations.map(formation => (
                    <option key={formation.id} value={formation.id}>
                      {formation.title}
                    </option>
                  ))}
                </select>
                {errors.formationId && <p className="mt-1 text-sm text-red-600">{errors.formationId}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                  Hours *
                </label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  min="1"
                  value={formData.hours}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.hours ? 'border-red-500' : 'border'}`}
                />
                {errors.hours && <p className="mt-1 text-sm text-red-600">{errors.hours}</p>}
              </div>

              <div>
                <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                  Credits *
                </label>
                <input
                  type="number"
                  id="credits"
                  name="credits"
                  min="1"
                  value={formData.credits}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.credits ? 'border-red-500' : 'border'}`}
                />
                {errors.credits && <p className="mt-1 text-sm text-red-600">{errors.credits}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {module ? 'Update Module' : 'Create Module'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModuleForm;