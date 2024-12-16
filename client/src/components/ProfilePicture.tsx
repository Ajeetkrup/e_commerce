import React, { useState, useRef } from 'react';
import { uploadProfilePicture, uploadToAWSBucket } from '../apis/api';

const ProfilePicture: React.FC<{ profileUrl: string }> = ({ profileUrl }) => {
  const [previewUrl, setPreviewUrl] = useState<string>("https://tools-api.webcrumbs.org/image-placeholder/150/150/avatars/1");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      //the file upload logic
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const body = {key: file.name, fileType: file.type};
    console.log(body);
    // return;
    try {
      const response1 = await uploadProfilePicture(body);
      await uploadToAWSBucket(file, response1?.urlToUploadInAwsBucket);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="webcrumbs">
      <div className="w-[300px] ">
        <div className="relative">
          <img
            className="w-[150px] h-[150px] rounded-full object-contain mx-auto"
            src={profileUrl ?? previewUrl}
            alt="Profile"
          />
          <div 
            className="w-[150px] h-[150px] mx-auto absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={handleEditClick}
          >
            <span className="text-white">Edit</span>
          </div>
        </div>
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;