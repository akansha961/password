document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const passwordStrength = document.getElementById("password-strength");
    const passwordList = document.getElementById("password-list");
    const addButton = document.getElementById("add-password");

    // Password conditions elements
    const uppercaseCondition = document.getElementById("uppercase");
    const lowercaseCondition = document.getElementById("lowercase");
    const digitCondition = document.getElementById("digit");
    const specialCharCondition = document.getElementById("specialchar");
    const lengthCondition = document.getElementById("length");

    // Function to calculate and display password strength
    function updatePasswordStrength() {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        passwordStrength.textContent = `Password Strength: ${strength}`;
    }

    // Check password strength and update the meter
    passwordInput.addEventListener("input", updatePasswordStrength);

    // Handle password addition
    addButton.addEventListener("click", () => {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        
        if (strength === "Strong") {
            // Add password to the list (simulated for this example)
            const listItem = document.createElement("li");
            listItem.textContent = password;
            passwordList.appendChild(listItem);

            // Clear the input field and conditions
            passwordInput.value = "";
            passwordStrength.textContent = "Password Strength: ";
            resetPasswordConditions();

            // Store the password securely (not implemented in this example)
            // In a real app, use a secure storage mechanism like localStorage or a database
        } else {
            alert("Weak passwords are not allowed. Please choose a stronger password.");
        }
    });

    // Function to calculate password strength
    function calculatePasswordStrength(password) {
        // Define regular expressions for each condition
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/; // Adjust this regex as needed

        // Check each condition
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasDigit = digitRegex.test(password);
        const hasSpecialChar = specialCharRegex.test(password);
        const isMinimumLength = password.length >= 8;

        // Update password conditions
        updatePasswordCondition(uppercaseCondition, hasUppercase);
        updatePasswordCondition(lowercaseCondition, hasLowercase);
        updatePasswordCondition(digitCondition, hasDigit);
        updatePasswordCondition(specialCharCondition, hasSpecialChar);
        updatePasswordCondition(lengthCondition, isMinimumLength);

        // Check all conditions
        if (hasUppercase && hasLowercase && hasDigit && hasSpecialChar && isMinimumLength) {
            return "Strong";
        } else {
            return "Weak";
        }
    }

    // Function to update password conditions visually
    function updatePasswordCondition(conditionElement, isMet) {
        if (isMet) {
            conditionElement.classList.remove("not-met");
        } else {
            conditionElement.classList.add("not-met");
        }
    }

    // Function to reset password conditions
    function resetPasswordConditions() {
        const conditions = [uppercaseCondition, lowercaseCondition, digitCondition, specialCharCondition, lengthCondition];
        conditions.forEach((condition) => {
            condition.classList.remove("not-met");
        });
    }
});
