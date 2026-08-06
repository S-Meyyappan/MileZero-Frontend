
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import ProfileHeader from "../../components/Customer/Profile/ProfileHeader";
import PersonalInformationCard from "../../components/Customer/Profile/PersonalInfoCard";
import DrivingLicenseCard from "../../components/Customer/Profile/DrivingLicenseCard";
import InsuranceCard from "../../components/Customer/Profile/InsuranceCard";
import ProfileActionCard from "../../components/Customer/Profile/ProfileActionCard";

export default function CustomerProfile() {

  const auth = useSelector(s => s.auth.form);

  const emptyForm = {
    name: "",
    phone: "",
    licenseNo: "",
    licenseExpiryDate: "",
    insurancePolicyNo: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [original, setOriginal] = useState(emptyForm);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [licensePhoto, setlicensePhoto] = useState(null);
  const [licensePreview, setLicensePreview] = useState("");

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  }

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8080/api/customer/get/me", headerConfig)
      const values = {
        name: data.name ?? "",
        phone: data.phone ?? "",
        licenseNo: data.licenseNo ?? "",
        licenseExpiryDate: data.licenseExpiryDate ?? "",
        insurancePolicyNo: data.insurancePolicyNo ?? "",
        licensePhoto: data.licensePhoto ?? ""
      }
      setForm(values);
      setOriginal(values);
      if (data.licensePhoto) {
        setLicensePreview(`/customer/${data.licensePhoto}`);
      } else {
        setLicensePreview("");
      }
    } catch (err) {
      toast.error(err.response?.data || "Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleCancel = () => {
    setEditing(false);
    setForm(original);
    setlicensePhoto(null);
    setLicensePreview(original.licensePhoto || "");
  };

  const handleSave = async () => {
    try {
      setSaving(true)

      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("licenseNo", form.licenseNo);
      fd.append("licenseExpiryDate", new Date(form.licenseExpiryDate).toISOString().split('T')[0]);
      fd.append("insurancePolicyNo", form.insurancePolicyNo);
      fd.append("imageFile", licensePhoto);

      await axios.put("http://localhost:8080/api/customer/update/me", fd,headerConfig)

      toast.success("Profile updated successfully.");
      setEditing(false);
      loadProfile();

    } 
    catch (err) {
      toast.error(err.response?.data?.message || "Unable to update profile.");
    } 
    finally {
      setSaving(false);
    }
  };

  return (
    <>

      <div className="bg-light min-vh-100">
        <div className="container py-4">

          <ProfileHeader />

          { loading ? (

            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>

          ) : (

            <div className="row g-4">

              <div className="col-lg-8">

                <PersonalInformationCard
                  form={form}
                  setForm={setForm}
                  editing={editing}
                />

                <DrivingLicenseCard
                  form={form}
                  setForm={setForm}
                  editing={editing}
                  licensePhoto={licensePhoto}
                  setlicensePhoto={setlicensePhoto}
                  licensePreview={licensePreview}
                  setLicensePreview={setLicensePreview}
                />

                <InsuranceCard
                  form={form}
                  setForm={setForm}
                  editing={editing}
                />

              </div>

              <div className="col-lg-4">

                <ProfileActionCard
                  editing={editing}
                  loading={loading}
                  saving={saving}
                  onEdit={() => setEditing(true)}
                  onCancel={handleCancel}
                  onSave={handleSave}
                />

              </div>

            </div>
          )}

        </div>
      </div>
    </>
  )
}
