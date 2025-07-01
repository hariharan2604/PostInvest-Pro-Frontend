export const validateForm = (formData) => {
    const errors = {};

    if (!formData.name) errors.name = "Full Name is required.";
    if (!/^[a-zA-Z ]{2,30}$/.test(formData.name)) errors.name = "Full name should contain only alphabets"

    if (!formData.mobile) errors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.mobile)) errors.mobile = "Invalid mobile number.";

    if (!formData.email) errors.email = "Email ID is required.";
    else if (!/^[\w-\.]+@[\w-\.]+\.[a-zA-Z]{2,}$/.test(formData.email)) errors.email = "Invalid email format.";

    if (!formData.password) errors.password = "Password is required.";
    if (!formData.confirm_password) errors.confirm_password = "Please confirm your password.";
    else if (formData.password !== formData.confirm_password) errors.confirm_password = "Passwords do not match.";

    if (!formData.dob) errors.dob = "Date of Birth is required.";

    if (!formData.address1) errors.address1 = "Address Line 1 is required.";

    if (!formData.area) errors.area = "Area is required.";

    if (!formData.city) errors.city = "City is required.";

    if (!formData.state) errors.state = "State is required.";

    if (!formData.zip) errors.zip = "Zip code is required.";
    else if (!/^\d{6}$/.test(formData.zip)) errors.zip = "Invalid zip code.";

    return errors;
}