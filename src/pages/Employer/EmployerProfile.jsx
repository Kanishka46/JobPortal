import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function EmployerProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    companyName: "",
    contact: "",
    location: "",
    github: "",
    jobRole: "",
    summary: "",
    referenceCode: "",
    profilePic: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("employerProfile"));
    if (savedProfile) {
      setProfile(savedProfile);
      if (savedProfile.profilePic) {
        setImagePreview(savedProfile.profilePic);
      }
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, profilePic: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProfile({ ...profile, profilePic: null });
    setImagePreview(null);
  };

  const handleSave = () => {
    localStorage.setItem("employerProfile", JSON.stringify(profile));
    alert("✅ Profile saved successfully!");
  };

  return (
    <Wrapper>
      <Card>
        <Title>Employer Profile</Title>

        <ImageWrapper>
          {imagePreview ? (
            <ProfileImg src={imagePreview} alt="profile" />
          ) : (
            <Placeholder>Upload Photo</Placeholder>
          )}

          <ButtonGroup>
            <UploadLabel>
              📎 Upload
              <ImageUpload type="file" accept="image/*" onChange={handleImageUpload} />
            </UploadLabel>

            {imagePreview && <RemoveBtn onClick={removeImage}>❌ Remove</RemoveBtn>}
          </ButtonGroup>
        </ImageWrapper>

        <Form>
          <InputBox>
            <label>Full Name</label>
            <Input name="fullName" value={profile.fullName} onChange={handleChange} />
          </InputBox>

          <InputBox>
            <label>Company Name</label>
            <Input name="companyName" value={profile.companyName} onChange={handleChange} />
          </InputBox>

          <InputBox>
            <label>Contact Info</label>
            <Input name="contact" value={profile.contact} onChange={handleChange} />
          </InputBox>

          <InputBox>
            <label>Location</label>
            <Input name="location" value={profile.location} onChange={handleChange} />
          </InputBox>

          <InputBox>
            <label>GitHub URL</label>
            <Input name="github" value={profile.github} onChange={handleChange} />
          </InputBox>

          <InputBox>
            <label>Job Role</label>
            <Input name="jobRole" value={profile.jobRole} onChange={handleChange} />
          </InputBox>

          <InputBox>
            <label>Reference Code</label>
            <Input name="referenceCode" value={profile.referenceCode} onChange={handleChange} />
          </InputBox>

          <InputBox>
            <label>Summary</label>
            <Textarea name="summary" value={profile.summary} onChange={handleChange} />
          </InputBox>

          <SaveButton onClick={handleSave}>💾 Save Profile</SaveButton>
        </Form>
      </Card>
    </Wrapper>
  );
}

/************ STYLES ************/
const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 28px;
  min-height: 100vh;
  background: #eef5ff;
  font-family: "Poppins", sans-serif;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 14px;
  border: 1px solid #cfe0ff;
  box-shadow: 0px 6px 18px rgba(0, 80, 180, 0.18);
`;

const Title = styled.h2`
  text-align: center;
  color: #0b5ed7;
  margin-bottom: 20px;
  font-weight: 700;
`;

const ImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 3px solid #0b5ed7;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 2px dashed #0b5ed7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0b5ed7;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
`;

const UploadLabel = styled.label`
  background: #0b5ed7;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;

  &:hover {
    background: #0846a3;
  }
`;

const RemoveBtn = styled.button`
  background: #d62828;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  border: none;

  &:hover {
    background: #b51f1f;
  }
`;

const ImageUpload = styled.input`
  display: none;
`;

const Form = styled.div`
  display: grid;
  gap: 15px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #004aad;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
  background: #f9fbff;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9cc0ff;
  background: #f9fbff;
  min-height: 80px;
`;

const SaveButton = styled.button`
  background: #0b5ed7;
  padding: 12px;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  margin-top: 10px;

  &:hover {
    background: #0846a3;
  }
`;
