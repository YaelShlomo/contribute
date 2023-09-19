using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

[AttributeUsage(AttributeTargets.Property)]
public class EnglishHebrewOnlyAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value != null)
        {
            string input = value.ToString();
            // Regular expression pattern to match English and Hebrew characters
            string pattern = @"^[\p{IsBasicLatin}\p{IsHebrew}]+$";

            if (!Regex.IsMatch(input, pattern))
            {
                return new ValidationResult(ErrorMessage);
            }
        }

        return ValidationResult.Success;
    }
}
