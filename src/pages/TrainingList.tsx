import React from 'react';
import '../styles/TrainingList.scss';

// Interfaces
interface TopicsListProps {
  title: string;
  items: string[];
}

interface FormField {
  id: string;
  label: string;
  type: string;
}

interface TrainingFormProps {
  id: string;
  title: string;
  fields: FormField[];
}

// Components
const TopicsList: React.FC<TopicsListProps> = ({ title, items }) => (
  <div>
    <h2>{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const TrainingForm: React.FC<TrainingFormProps> = ({ id, title, fields }) => (
  <form id={id}>
    <h2>{title}</h2>
    {fields.map((field) => (
      <div key={field.id}>
        <label htmlFor={field.id}>{field.label}</label>
        <input id={field.id} type={field.type} />
      </div>
    ))}
    <button className='primary' type="submit">Submit</button>
  </form>
);

const TrainingList: React.FC = () => {
  const individualLearningTopics: string[] = [
    'Auto Layout Mastery',
    'Component Creation & Management',
    'Interactive Components',
    'Bulk Actions & Page Numbering',
    'Excel Data Integration',
    'PDF Export Optimization',
    'Multi-element Editing',
    'Time-saving Techniques'
  ];

  const companyTeamTraining: string[] = [
    'Customized Team Workshops',
    'Workflow Optimization',
    'Design System Setup',
    'Collaborative Design Practices'
  ];

  const individualFormFields: FormField[] = [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' }
  ];

  const companyFormFields: FormField[] = [
    { id: 'companyName', label: 'Company Name', type: 'text' },
    { id: 'contactPerson', label: 'Contact Person', type: 'text' },
    { id: 'companyEmail', label: 'Email', type: 'email' },
    { id: 'teamSize', label: 'Team Size', type: 'number' }
  ];

  return (
    <div className='training-parent'>
      {/* Individual Section */}
      <div className='training'>
        <h2>For Individuals</h2>
        <p>Inaugural Offer: ₹1000 flat for one hour</p>
        <TopicsList title="What You'll Learn" items={individualLearningTopics} />
        <button className='primary' type="submit">Submit</button>
      </div>

      {/* Company Section */}
      <div className='training'>
        <h2>For Companies</h2>
        <TopicsList title="Team Training" items={companyTeamTraining} />
        <TrainingForm 
          id="companyForm" 
          title="Enquire Now" 
          fields={companyFormFields} 
        />
      </div>
    </div>
  );
};

export default TrainingList;