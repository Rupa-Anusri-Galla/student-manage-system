import React, { useState, useEffect } from 'react';
import { User, Upload, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentForm = ({ initialData, onSubmit, submitText, loading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phoneNumber: '',
    gender: 'Male',
    dateOfBirth: '',
    department: '',
    year: '1st Year',
    address: '',
    parentName: '',
    parentPhone: '',
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      const formattedDate = initialData.dateOfBirth
        ? new Date(initialData.dateOfBirth).toISOString().split('T')[0]
        : '';
      setFormData({
        fullName: initialData.fullName || '',
        rollNumber: initialData.rollNumber || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || '',
        gender: initialData.gender || 'Male',
        dateOfBirth: formattedDate,
        department: initialData.department || '',
        year: initialData.year || '1st Year',
        address: initialData.address || '',
        parentName: initialData.parentName || '',
        parentPhone: initialData.parentPhone || '',
      });
      if (initialData.profilePhoto) {
        setPhotoPreview(initialData.profilePhoto);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!formData.rollNumber.trim()) tempErrors.rollNumber = 'Roll number is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber.trim()) tempErrors.phoneNumber = 'Phone number is required';
    if (!formData.dateOfBirth) tempErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.department.trim()) tempErrors.department = 'Department is required';
    if (!formData.address.trim()) tempErrors.address = 'Address is required';
    if (!formData.parentName.trim()) tempErrors.parentName = 'Parent/Guardian name is required';
    if (!formData.parentPhone.trim()) tempErrors.parentPhone = 'Parent phone number is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (photo) {
      data.append('profilePhoto', photo);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <Link to="/students" className="btn btn-secondary" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={16} />
        </Link>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '750', color: 'var(--text-primary)' }}>Student Information Form</h3>
      </div>

      {/* Photo Upload Section */}
      <div className="form-group">
        <label className="form-label">Profile Photo</label>
        <div className="image-upload-wrapper">
          {photoPreview ? (
            <img src={photoPreview} alt="Preview" className="image-preview" />
          ) : (
            <div className="image-upload-placeholder">
              <User size={32} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Supported formats: JPEG, PNG, WEBP. Max size 5MB.</span>
            <label className="image-upload-btn-label">
              <Upload size={14} style={{ marginRight: '0.25rem' }} />
              Upload Image
              <input type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="form-control"
            style={errors.fullName ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.fullName && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.fullName}</span>}
        </div>

        {/* Roll Number */}
        <div className="form-group">
          <label className="form-label">Roll Number *</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="CS2026001"
            className="form-control"
            style={errors.rollNumber ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.rollNumber && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.rollNumber}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2">
        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@university.com"
            className="form-control"
            style={errors.email ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1 555-0199"
            className="form-control"
            style={errors.phoneNumber ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.phoneNumber && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.phoneNumber}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ gap: '1rem' }}>
        {/* Gender */}
        <div className="form-group">
          <label className="form-label">Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="form-control">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label className="form-label">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-control"
            style={errors.dateOfBirth ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.dateOfBirth && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.dateOfBirth}</span>}
        </div>

        {/* Year */}
        <div className="form-group">
          <label className="form-label">Academic Year *</label>
          <select name="year" value={formData.year} onChange={handleChange} className="form-control">
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2">
        {/* Department */}
        <div className="form-group">
          <label className="form-label">Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Computer Science"
            className="form-control"
            style={errors.department ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.department && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.department}</span>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label className="form-label">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Academic Way, Cityville"
            className="form-control"
            style={errors.address ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.address && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.address}</span>}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 650, color: 'var(--text-secondary)' }}>Parent / Guardian Contacts</h4>
        <div className="grid grid-cols-2">
          {/* Parent Name */}
          <div className="form-group">
            <label className="form-label">Parent / Guardian Name *</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Robert Doe"
              className="form-control"
              style={errors.parentName ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.parentName && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.parentName}</span>}
          </div>

          {/* Parent Phone */}
          <div className="form-group">
            <label className="form-label">Parent / Guardian Phone *</label>
            <input
              type="text"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              placeholder="+1 555-0177"
              className="form-control"
              style={errors.parentPhone ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.parentPhone && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.parentPhone}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
        <Link to="/students" className="btn btn-secondary">Cancel</Link>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Processing...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
