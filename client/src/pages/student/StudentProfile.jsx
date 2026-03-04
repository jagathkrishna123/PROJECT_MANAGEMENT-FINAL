import React, { useState, useEffect } from 'react'
import { FaUser, FaEnvelope, FaIdCard, FaBuilding, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaSave, FaCamera } from 'react-icons/fa'
import { useAdmin } from '../../contexts/AdminContext'

const StudentProfile = () => {
  const { updateStudentProfile, Studentprofiles } = useAdmin()
  const [currentUser, setCurrentUser] = useState(null)
  const [profileData, setProfileData] = useState({
    dob: '',
    phone: '',
    place: '',
    address: '',
    registerNumber: '',
    profileImage: ''
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    // const userData = localStorage.getItem('user')
    // if (!userData) return

    try {
      // const user = JSON.parse(userData)
      // if (user.role !== 'student') return

      setCurrentUser(Studentprofiles)

      if (Studentprofiles) {
        setProfileData({
          dob: Studentprofiles.dob || '',
          phone: Studentprofiles.phone || '',
          place: Studentprofiles.place || '',
          address: Studentprofiles.address || '',
          registerNumber: Studentprofiles.rollNo || '',
          profileImage: Studentprofiles.profileImage || ''
        })
      }

      setImagePreview(
        Studentprofiles.profileImage
          ? `http://localhost:5000/uploads/${Studentprofiles.profileImage}`
          : ""
      );

    } catch (err) {
      console.error('User parse error:', err)
    }
  }, [Studentprofiles])



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please upload a valid image file (JPG, PNG, etc.)",
      });
      return;
    }

    // ✅ Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image size should be less than 2MB",
      });
      return;
    }

    // ✅ Store FILE OBJECT directly (IMPORTANT)
    setProfileData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    // ✅ Create preview URL (no base64 needed)
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSaveProfile = () => {
    if (profileData.phone && !/^\d{10}$/.test(profileData.phone.replace(/\s/g, ''))) {
      setMessage({ type: 'error', text: 'Enter valid 10 digit phone number' })
      return
    }

    setSaving(true)

    try {
      updateStudentProfile(currentUser.id, profileData)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })

      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 3000)
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
            <FaUser className="text-blue-500" />
            Student Profile
          </h1>
          <p className="text-gray-500">Manage your profile information</p>
        </div>

        {/* Profile Image */}
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 mb-6 shadow-md">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-5xl text-white" />
                )}
              </div>

              <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow">
                <FaCamera />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-sm text-gray-500">Upload profile picture</p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 mb-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Info label="Full Name" value={currentUser.name} />
            <Info label="Username" value={currentUser.username} />
            <Info label="Email" value={currentUser.email} />
            <Info label="Department" value={currentUser.department} />

          </div>
        </div>

        {/* Editable Info */}
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Additional Information</h2>

          <div className="space-y-5">

            <InputField label="Date of Birth" type="date" name="dob" value={profileData.dob} onChange={handleInputChange} />

            <InputField label="Phone" name="phone" value={profileData.phone} onChange={handleInputChange} />

            <InputField label="Place" name="place" value={profileData.place} onChange={handleInputChange} />

            <InputField label="Register Number" name="registerNumber" value={profileData.registerNumber} onChange={handleInputChange} />

            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mt-6 p-4 rounded-lg ${message.type === 'success'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
            }`}>
            {message.text}
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg shadow flex items-center gap-2"
          >
            <FaSave />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

      </div>
    </div>
  )
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-700">
      {value}
    </div>
  </div>
)

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>
)

export default StudentProfile
