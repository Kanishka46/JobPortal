import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    summary: "",
    keySkills: "",
    experience: "",
    education: "",
    certifications: "",
    languages: "",
    careerObjective: "",
    contactInfo: "",
    github: "",
    profilePic: null,
    resume: null,
    resumeName: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("jobSeekerProfile"));
    if (saved) {
      setProfile(saved);
      if (saved.profilePic) setImagePreview(saved.profilePic);
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

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({
        ...profile,
        resume: reader.result,
        resumeName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const removeResume = () => {
    setProfile({ ...profile, resume: null, resumeName: "" });
  };

  const saveProfile = () => {
    localStorage.setItem("jobSeekerProfile", JSON.stringify(profile));
    alert("✅ Profile saved successfully!");
  };

  return (
    <Wrapper>
      <Card>
        <Title>Job Seeker Profile</Title>

        <PhotoSection>
          {imagePreview ? (
            <ProfileImg src={imagePreview} alt="Profile" />
          ) : (
            <Placeholder>Upload Photo</Placeholder>
          )}

          <ButtonGroup>
            <UploadLabel>
              📎 Upload
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </UploadLabel>

            {imagePreview && (
              <RemoveBtn onClick={removeImage}>❌ Remove</RemoveBtn>
            )}
          </ButtonGroup>
        </PhotoSection>

        <Form>
          <Label>Full Name</Label>
          <Input name="fullName" value={profile.fullName} onChange={handleChange} />

          <Label>Profile Summary</Label>
          <Textarea name="summary" value={profile.summary} onChange={handleChange} />

          <Label>Key Skills</Label>
          <Input name="keySkills" value={profile.keySkills} onChange={handleChange} />

          <Label>Experience</Label>
          <Textarea name="experience" value={profile.experience} onChange={handleChange} />

          <Label>Education</Label>
          <Textarea name="education" value={profile.education} onChange={handleChange} />

          <Label>Certifications</Label>
          <Textarea name="certifications" value={profile.certifications} onChange={handleChange} />

          <Label>Languages</Label>
          <Input name="languages" value={profile.languages} onChange={handleChange} />

          <Label>Career Objective</Label>
          <Textarea name="careerObjective" value={profile.careerObjective} onChange={handleChange} />

          <Label>Contact Information</Label>
          <Textarea name="contactInfo" value={profile.contactInfo} onChange={handleChange} />

          <Label>GitHub URL</Label>
          <Input name="github" value={profile.github} onChange={handleChange} />

          <Label>Upload Resume (PDF/DOC)</Label>
          <ResumeRow>
            <UploadLabel>
              📄 Upload Resume
              <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleResumeUpload} />
            </UploadLabel>

            {profile.resumeName && (
              <>
                <ResumeText>{profile.resumeName}</ResumeText>
                <RemoveBtn onClick={removeResume}>❌</RemoveBtn>
              </>
            )}
          </ResumeRow>

          <SaveBtn onClick={saveProfile}>💾 Save Profile</SaveBtn>
        </Form>
      </Card>
    </Wrapper>
  );
}

/* ✅ Styled Components */

const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 30px;
  min-height: 100vh;
  background: #eef5ff;
  font-family: Poppins, sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 14px;
  border: 1px solid #bcd2ff;
  box-shadow: 0 6px 18px rgba(0, 85, 170, 0.18);
`;

const Title = styled.h2`
  text-align: center;
  color: #0b5ed7;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PhotoSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImg = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 3px solid #0b5ed7;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 140px;
  height: 140px;
  background: #f0f7ff;
  border: 2px dashed #0b5ed7;
  color: #0b5ed7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
`;

const UploadLabel = styled.label`
  background: #0b5ed7;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #0846a3;
  }
`;

const RemoveBtn = styled.button`
  background: #d62828;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #b01e1e;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  color: #003875;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #a9caff;
  background: #f9fbff;
`;

const Textarea = styled.textarea`
  padding: 10px;
  min-height: 80px;
  border-radius: 8px;
  border: 1px solid #a9caff;
  background: #f9fbff;
`;

const ResumeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ResumeText = styled.span`
  color: #0846a3;
  font-weight: 600;
`;

const SaveBtn = styled.button`
  padding: 12px;
  margin-top: 10px;
  background: #0b5ed7;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #0846a3;
  }
`;
