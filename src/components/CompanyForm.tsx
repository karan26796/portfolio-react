import React from 'react';
import Button from './Buttons';

const CompanyForm: React.FC = () => (
  <form id="companyForm" action="https://formspree.io/f/mqakkbgl" method="POST">
    <input type="text" placeholder="Company Name" />
    <input type="text" placeholder="Contact Person" />
    <input type="email" placeholder="Email" />
    <input type="number" placeholder="Team Size" />
    <Button
      className="submit-button"
      text="Get a quote"
      variant="primary"
      type="submit"
    />
  </form>
);

export default CompanyForm;