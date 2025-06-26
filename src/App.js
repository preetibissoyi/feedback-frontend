import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Backend URL configuration - use environment variable from .env file
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Debug: Log the environment variable
console.log('🔍 Environment variable REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);
console.log('🔍 BACKEND_URL constant:', BACKEND_URL);
// Check if environment variable is missing
if (!BACKEND_URL) {
  console.error('❌ REACT_APP_BACKEND_URL is not defined in .env file!');
  console.error('❌ Please create a .env file in the feedback-frontend directory with:');
  console.error('❌ REACT_APP_BACKEND_URL=https://your-backend-url.com');
}
// Function to test backend URL (only deployed)
const testBackendUrls = async () => {
  const url = BACKEND_URL;
  
  // Safety check for undefined URL
  if (!url) {
    console.error('❌ BACKEND_URL is undefined! Cannot test connection.');
    return null;
  }
  
  try {
    console.log(`🔍 Testing URL: ${url}`);
    const response = await fetch(`${url}/`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });
    if (response.ok) {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (data.feedbacks !== undefined) {
          console.log(`✅ Working backend found: ${url}`);
          return url;
        }
      } catch (e) {
        console.log(`❌ URL ${url} returned non-JSON response`);
      }
    }
  } catch (error) {
    console.log(`❌ URL ${url} failed:`, error.message);
  }
  return null;
};

// Homepage Component
function HomePage() {
  const navigate = useNavigate();

  const handleFormClick = (formType) => {
    navigate(`/feedback/${formType}`);
  };
  const handleViewClick = () => {
    navigate('/view');
  };
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Nimapara Autonomous College</h1>
        <h2>Feedback System</h2>
        <p>Help us improve by sharing your valuable feedback</p>
      </div>
      
      <div className="options-grid">
        <div className="option-card" onClick={() => handleFormClick('student')}>
          <div className="card-icon">🎓</div>
          <h3>Student Feedback</h3>
          <p>Share your academic experience and campus life feedback</p>
          <button className="card-button">Fill Form</button>
        </div>
        
        <div className="option-card" onClick={() => handleFormClick('parent')}>
          <div className="card-icon">👨‍👩‍👧‍👦</div>
          <h3>Parent Feedback</h3>
          <p>Provide feedback about your child's college experience</p>
          <button className="card-button">Fill Form</button>
        </div>
        
        <div className="option-card" onClick={() => handleFormClick('alumni')}>
          <div className="card-icon">🏆</div>
          <h3>Alumni Feedback</h3>
          <p>Share how your college experience prepared you for career</p>
          <button className="card-button">Fill Form</button>
        </div>
        
        <div className="option-card admin-card" onClick={handleViewClick}>
          <div className="card-icon">📊</div>
          <h3>View Feedback</h3>
          <p>Admin access to view submitted feedback data</p>
          <button className="card-button">View Data</button>
        </div>
      </div>
    </div>
  );
}
// Student Feedback Form Component
function StudentFeedbackForm() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    studentName: '',
    department: '',
    yearOfStudy: '',
    major: '',
    studentId: '',
    instructionQuality: '',
    facultyHelpfulness: '',
    teachingMethods: '',
    courseAlignment: '',
    libraryResources: '',
    academicAdvising: '',
    tutoringServices: '',
    onlineLearning: '',
    academicResourcesImprovement: '',
    campusEnvironment: '',
    studentHealth: '',
    careerServices: '',
    counsellingServices: '',
    itSupport: '',
    foodServices: '',
    hostel: '',
    studentActivities: '',
    communityPromotion: '',
    diversityInclusion: '',
    extracurricularSuggestions: '',
    facilityCondition: '',
    facilityConditionExplain: '',
    wifiReliability: '',
    facilityImprovements: '',
    strengths: '',
    areasForImprovement: '',
    otherComments: ''
  });
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/studentfeedback/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setForm({
          studentName: '', department: '', yearOfStudy: '', major: '', studentId: '',
          instructionQuality: '', facultyHelpfulness: '', teachingMethods: '',
          courseAlignment: '', libraryResources: '', academicAdvising: '',
          tutoringServices: '', onlineLearning: '', academicResourcesImprovement: '',
          campusEnvironment: '', studentHealth: '', careerServices: '',
          counsellingServices: '', itSupport: '', foodServices: '', hostel: '',
          studentActivities: '', communityPromotion: '', diversityInclusion: '',
          extracurricularSuggestions: '', facilityCondition: '',
          facilityConditionExplain: '', wifiReliability: '', facilityImprovements: '',
          strengths: '', areasForImprovement: '', otherComments: ''
        });
      }
    } catch (err) {
      setMessage('Failed to submit feedback. Please check your connection.');
    }
    setLoading(false);
  };

  return (
    <div className="feedback-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>Student Feedback Form</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-section">
          <h2>Section 1: General Information</h2>
          <div className="form-group">
            <label>Student Name:</label>
            <input name="studentName" value={form.studentName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <input name="department" value={form.department} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Year of Study:</label>
            <input name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Major/Program of Study:</label>
            <input name="major" value={form.major} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Student ID:</label>
            <input name="studentId" value={form.studentId} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h2>Section 2: Academic Experience</h2>
          <div className="form-group">
            <label>1. How satisfied are you with the quality of instruction in your courses?</label>
            <div className="radio-group">
              {["Very Satisfied","Satisfied","Neutral","Dissatisfied","Very Dissatisfied"].map(opt => (
                <label key={opt} className="radio-option">
                  <input type="radio" name="instructionQuality" value={opt} checked={form.instructionQuality===opt} onChange={handleChange} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label>2. How accessible and helpful are your faculties?</label>
            <div className="radio-group">
              {["Very Accessible/Helpful","Accessible/Helpful","Neutral","Inaccessible/Unhelpful"].map(opt => (
                <label key={opt} className="radio-option">
                  <input type="radio" name="facultyHelpfulness" value={opt} checked={form.facultyHelpfulness===opt} onChange={handleChange} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label>3. How effective are the teaching methods used in your courses?</label>
            <textarea name="teachingMethods" value={form.teachingMethods} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>4. How well do your courses align with your academic and career goals?</label>
            <textarea name="courseAlignment" value={form.courseAlignment} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h2>Section 3: Campus Life and Student Services</h2>
          <div className="form-group">
            <label>1. How satisfied are you with the overall campus environment?</label>
            <div className="radio-group">
              {["Very Satisfied","Satisfied","Neutral","Dissatisfied","Very Dissatisfied"].map(opt => (
                <label key={opt} className="radio-option">
                  <input type="radio" name="campusEnvironment" value={opt} checked={form.campusEnvironment===opt} onChange={handleChange} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Section 4: Overall Feedback and Suggestions</h2>
          <div className="form-group">
            <label>1. What are the strengths of Nimapara Autonomous College?</label>
            <textarea name="strengths" value={form.strengths} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>2. What areas need improvement?</label>
            <textarea name="areasForImprovement" value={form.areasForImprovement} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>3. Do you have any other comments or suggestions for the college administration?</label>
            <textarea name="otherComments" value={form.otherComments} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// Parent Feedback Form Component
function ParentFeedbackForm() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    studentName: '',
    studentYear: '',
    studentMajor: '',
    parentName: '',
    academicSatisfaction: '',
    academicSatisfactionExplain: '',
    advisorSupport: '',
    advisorSupportExplain: '',
    informed: '',
    informedExplain: '',
    academicCommunication: '',
    academicCommunicationSuggestions: '',
    sufficientResources: '',
    insufficientResourcesExplain: '',
    campusSafety: '',
    campusSafetyExplain: '',
    supportServices: '',
    supportServicesExplain: '',
    parentCommunication: '',
    parentCommunicationSuggestions: '',
    adminAccessibility: '',
    adminAccessibilityExplain: '',
    socialEmotional: '',
    parentStrengths: '',
    parentImprovements: '',
    parentComments: ''
  });
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/parentfeedback/parent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setForm({
          studentName: '', studentYear: '', studentMajor: '', parentName: '',
          academicSatisfaction: '', academicSatisfactionExplain: '', advisorSupport: '',
          advisorSupportExplain: '', informed: '', informedExplain: '',
          academicCommunication: '', academicCommunicationSuggestions: '',
          sufficientResources: '', insufficientResourcesExplain: '', campusSafety: '',
          campusSafetyExplain: '', supportServices: '', supportServicesExplain: '',
          parentCommunication: '', parentCommunicationSuggestions: '',
          adminAccessibility: '', adminAccessibilityExplain: '', socialEmotional: '',
          parentStrengths: '', parentImprovements: '', parentComments: ''
        });
      }
    } catch (err) {
      setMessage('Failed to submit feedback. Please check your connection.');
    }
    setLoading(false);
  };

  return (
    <div className="feedback-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>Parent Feedback Form</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-section">
          <h2>Section 1: Student Information</h2>
          <div className="form-group">
            <label>Student Name:</label>
            <input name="studentName" value={form.studentName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Student Year of Study:</label>
            <input name="studentYear" value={form.studentYear} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Student Major/Program:</label>
            <input name="studentMajor" value={form.studentMajor} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Name of the parent:</label>
            <input name="parentName" value={form.parentName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h2>Section 2: Academic Experience</h2>
          <div className="form-group">
            <label>1. How satisfied are you with the academic progress of your child?</label>
            <div className="radio-group">
              {["Very Satisfied","Satisfied","Neutral","Dissatisfied","Very Dissatisfied"].map(opt => (
                <label key={opt} className="radio-option">
                  <input type="radio" name="academicSatisfaction" value={opt} checked={form.academicSatisfaction===opt} onChange={handleChange} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <div className="form-group">
              <label>Please explain:</label>
              <textarea name="academicSatisfactionExplain" value={form.academicSatisfactionExplain} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Section 3: Campus Life and Student Support</h2>
          <div className="form-group">
            <label>1. How safe do you feel your child is on campus?</label>
            <div className="radio-group">
              {["Very Safe","Safe","Neutral","Unsafe","Very Unsafe"].map(opt => (
                <label key={opt} className="radio-option">
                  <input type="radio" name="campusSafety" value={opt} checked={form.campusSafety===opt} onChange={handleChange} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <div className="form-group">
              <label>Please explain:</label>
              <textarea name="campusSafetyExplain" value={form.campusSafetyExplain} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Section 4: Overall Feedback and Suggestions</h2>
          <div className="form-group">
            <label>1. What are the strengths of Nimapara Autonomous College in supporting students and their families?</label>
            <textarea name="parentStrengths" value={form.parentStrengths} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>2. What areas do you believe the college should focus on improving?</label>
            <textarea name="parentImprovements" value={form.parentImprovements} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>3. Do you have any additional comments or suggestions for the college administration?</label>
            <textarea name="parentComments" value={form.parentComments} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// Alumni Feedback Form Component
function AlumniFeedbackForm() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: '',
    graduationYear: '',
    major: '',
    email: '',
    profession: '',
    prepForCareer: '',
    prepForCareerExplain: '',
    mostBeneficial: '',
    couldBeImproved: '',
    teachingQuality: '',
    teachingQualityExplain: '',
    alumniLibrary: '',
    alumniAdvising: '',
    alumniCareer: '',
    alumniIT: '',
    alumniOtherResources: '',
    campusLifeSatisfaction: '',
    campusLifeExplain: '',
    extracurricularValue: '',
    extracurricularExplain: '',
    alumniCommunity: '',
    alumniDiversity: '',
    alumniEngagement: '',
    alumniEngagementExplain: '',
    alumniCommunication: '',
    alumniEvents: [],
    alumniEventsOther: '',
    alumniCommImprove: '',
    alumniStrengths: '',
    alumniImprovements: '',
    alumniComments: ''
  });
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = e => {
    const { name, value, type: inputType } = e.target;
    if (inputType === 'checkbox') {
      setForm(prev => {
        const arr = prev.alumniEvents.includes(value)
          ? prev.alumniEvents.filter(v => v !== value)
          : [...prev.alumniEvents, value];
        return { ...prev, alumniEvents: arr };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/alumnifeedback/alumni`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setForm({
          name: '', graduationYear: '', major: '', email: '', profession: '',
          prepForCareer: '', prepForCareerExplain: '', mostBeneficial: '',
          couldBeImproved: '', teachingQuality: '', teachingQualityExplain: '',
          alumniLibrary: '', alumniAdvising: '', alumniCareer: '', alumniIT: '',
          alumniOtherResources: '', campusLifeSatisfaction: '', campusLifeExplain: '',
          extracurricularValue: '', extracurricularExplain: '', alumniCommunity: '',
          alumniDiversity: '', alumniEngagement: '', alumniEngagementExplain: '',
          alumniCommunication: '', alumniEvents: [], alumniEventsOther: '',
          alumniCommImprove: '', alumniStrengths: '', alumniImprovements: '', alumniComments: ''
        });
      }
    } catch (err) {
      setMessage('Failed to submit feedback. Please check your connection.');
    }
    setLoading(false);
  };

  return (
    <div className="feedback-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>Alumni Feedback Form 2024-25</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Name:</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Graduation Year:</label>
            <input name="graduationYear" value={form.graduationYear} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Major/Program of Study:</label>
            <input name="major" value={form.major} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Current Profession/Industry:</label>
            <input name="profession" value={form.profession} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h2>Section 2: Academic Experience</h2>
          <div className="form-group">
            <label>1. How well did your academic experience at Nimapara Autonomous College prepare you for your career?</label>
            <div className="radio-group">
              {["Very Well","Well","Moderately","Poorly","Very Poorly"].map(opt => (
                <label key={opt} className="radio-option">
                  <input type="radio" name="prepForCareer" value={opt} checked={form.prepForCareer===opt} onChange={handleChange} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <div className="form-group">
              <label>Please explain:</label>
              <textarea name="prepForCareerExplain" value={form.prepForCareerExplain} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Section 5: Overall Feedback and Recommendations</h2>
          <div className="form-group">
            <label>1. What are the most significant strengths of Nimapara Autonomous College?</label>
            <textarea name="alumniStrengths" value={form.alumniStrengths} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>2. What areas should the college focus on improving?</label>
            <textarea name="alumniImprovements" value={form.alumniImprovements} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>3. Do you have any additional comments or suggestions?</label>
            <textarea name="alumniComments" value={form.alumniComments} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// View Feedback Component
function ViewFeedback() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = React.useState({ students: [], parents: [], alumni: [] });
  const [activeTab, setActiveTab] = React.useState('students');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [connectionStatus, setConnectionStatus] = React.useState('checking');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  // Simple filter state
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  // API endpoints
  const STUDENT_URL = 'https://feedback-backend-hbme.onrender.com/studentfeedback/all';
  const PARENT_URL = 'https://feedback-backend-hbme.onrender.com/parentfeedback/all';
  const ALUMNI_URL = 'https://feedback-backend-hbme.onrender.com/alumnifeedback/all';

  // Admin password (you can change this to any password you want)
  const ADMIN_PASSWORD = 'admin123';

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
      // Load data after successful authentication
      fetchAllFeedbacks();
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  // Check connection by pinging all endpoints
  const checkConnection = async () => {
    try {
      const [studentRes, parentRes, alumniRes] = await Promise.all([
        fetch(STUDENT_URL),
        fetch(PARENT_URL),
        fetch(ALUMNI_URL)
      ]);
      if (studentRes.ok && parentRes.ok && alumniRes.ok) {
        setConnectionStatus('connected');
        return true;
      } else {
        setConnectionStatus('disconnected');
        return false;
      }
    } catch (err) {
      setConnectionStatus('disconnected');
      return false;
    }
  };

  // Fetch all feedbacks from all endpoints
  const fetchAllFeedbacks = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [studentRes, parentRes, alumniRes] = await Promise.all([
        fetch(STUDENT_URL),
        fetch(PARENT_URL),
        fetch(ALUMNI_URL)
      ]);
      if (!studentRes.ok || !parentRes.ok || !alumniRes.ok) {
        setError('Failed to fetch one or more feedback types.');
        setLoading(false);
        return;
      }
      const [studentData, parentData, alumniData] = await Promise.all([
        studentRes.json(),
        parentRes.json(),
        alumniRes.json()
      ]);
      setFeedbacks({
        students: studentData.feedbacks || [],
        parents: parentData.feedbacks || [],
        alumni: alumniData.feedbacks || []
      });
    } catch (err) {
      setError('Failed to fetch feedback data.');
    }
    setLoading(false);
  }, []);

  // Check connection when component mounts
  React.useEffect(() => {
    checkConnection();
  }, []);

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="view-page">
        <div className="page-header">
          <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
          <h1>Admin Access Required</h1>
        </div>
        
        <div className="password-protection">
          <div className="password-form-container">
            <div className="password-form">
              <h2>🔒 Enter Admin Password</h2>
              <p>Please enter the admin password to view feedback data.</p>
              
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    autoFocus
                  />
                </div>
                
                {passwordError && (
                  <div className="error-message">
                    <p>{passwordError}</p>
                  </div>
                )}
                
                <button type="submit" className="submit-button">
                  🔓 Access Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatFeedbackData = (feedback) => {
    console.log('Processing feedback:', feedback);
    
    // Use the feedback object directly since it's already structured
    const sections = [];
    
    // Basic Info
    const basicInfo = {};
    if (feedback.studentName) basicInfo['Student Name'] = feedback.studentName;
    if (feedback.name) basicInfo['Name'] = feedback.name;
    if (feedback.studentYear) basicInfo['Year'] = feedback.studentYear;
    if (feedback.studentMajor) basicInfo['Major'] = feedback.studentMajor;
    if (feedback.studentId) basicInfo['Student ID'] = feedback.studentId;
    if (feedback.email) basicInfo['Email'] = feedback.email;
    if (feedback.parentName) basicInfo['Parent Name'] = feedback.parentName;
    if (feedback.graduationYear) basicInfo['Graduation Year'] = feedback.graduationYear;
    if (feedback.profession) basicInfo['Profession'] = feedback.profession;
    
    if (Object.keys(basicInfo).length > 0) {
      sections.push({ title: 'Basic Information', data: basicInfo });
    }
    
    // Academic Experience
    if (feedback.academicExperience) {
      const academicData = {};
      Object.entries(feedback.academicExperience).forEach(([key, value]) => {
        if (value) {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          academicData[label] = value;
        }
      });
      if (Object.keys(academicData).length > 0) {
        sections.push({ title: 'Academic Experience', data: academicData });
      }
    }
    
    // Academic Resources
    if (feedback.academicResources) {
      const resourceData = {};
      Object.entries(feedback.academicResources).forEach(([key, value]) => {
        if (value) {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          resourceData[label] = value;
        }
      });
      if (Object.keys(resourceData).length > 0) {
        sections.push({ title: 'Academic Resources', data: resourceData });
      }
    }
    
    // Campus Life
    if (feedback.campusLife) {
      const campusData = {};
      Object.entries(feedback.campusLife).forEach(([key, value]) => {
        if (value) {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          campusData[label] = value;
        }
      });
      if (Object.keys(campusData).length > 0) {
        sections.push({ title: 'Campus Life & Services', data: campusData });
      }
    }
    
    // Facilities
    if (feedback.facilities) {
      const facilityData = {};
      Object.entries(feedback.facilities).forEach(([key, value]) => {
        if (value) {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          facilityData[label] = value;
        }
      });
      if (Object.keys(facilityData).length > 0) {
        sections.push({ title: 'Facilities & Technology', data: facilityData });
      }
    }
    
    // Alumni Engagement
    if (feedback.alumniEngagement) {
      const alumniData = {};
      Object.entries(feedback.alumniEngagement).forEach(([key, value]) => {
        if (value && value.length > 0) {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          alumniData[label] = Array.isArray(value) ? value.join(', ') : value;
        }
      });
      if (Object.keys(alumniData).length > 0) {
        sections.push({ title: 'Alumni Engagement', data: alumniData });
      }
    }
    
    // Overall Feedback
    if (feedback.overallFeedback) {
      const overallData = {};
      Object.entries(feedback.overallFeedback).forEach(([key, value]) => {
        if (value) {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          overallData[label] = value;
        }
      });
      if (Object.keys(overallData).length > 0) {
        sections.push({ title: 'Overall Feedback', data: overallData });
      }
    }
    
    return sections;
  };

  return (
    <div className="view-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>View Feedback Data</h1>
      </div>
      
      <div className="feedback-dashboard">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h2>Feedback Dashboard</h2>
            <div className="connection-status">
              <span className={`status-indicator ${connectionStatus}`}>
                {connectionStatus === 'connected' ? '🟢' : connectionStatus === 'checking' ? '🟡' : '🔴'}
              </span>
              <span className="status-text">
                {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'checking' ? 'Checking...' : 'Disconnected'}
              </span>
            </div>
            <button onClick={fetchAllFeedbacks} className="refresh-button" title="Refresh data">
              🔄
            </button>
            <button onClick={async () => {
              setError(null);
              const url = await testBackendUrls();
              if (url) {
                setError(`✅ Backend connection successful: ${url}`);
              } else {
                setError('❌ No working backend found. Please check server status.');
              }
            }} className="test-button" title="Test connection">
              🔗
            </button>
          </div>
          <div className="stats-summary">
            <button onClick={fetchAllFeedbacks} className="fetch-all-button" title="Fetch all feedback data">
              📊 Fetch All Feedback
            </button>
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchAllFeedbacks} className="retry-button">Retry</button>
          </div>
        )}
        
        {loading && (
          <div className="loading-message">
            <p>Loading feedback data...</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="filter-controls">
              <div className="filter-group">
                <label>Filter by Type:</label>
                <select 
                  value={selectedFilter} 
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="student">Students</option>
                  <option value="parent">Parents</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
            </div>
            
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                Students ({feedbacks.students.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'parents' ? 'active' : ''}`}
                onClick={() => setActiveTab('parents')}
              >
                Parents ({feedbacks.parents.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'alumni' ? 'active' : ''}`}
                onClick={() => setActiveTab('alumni')}
              >
                Alumni ({feedbacks.alumni.length})
              </button>
            </div>
            
            <div className="feedback-list">
              {(() => {
                let displayFeedbacks = [];
                
                if (selectedFilter === 'all') {
                  displayFeedbacks = feedbacks[activeTab] || [];
                } else if (selectedFilter === 'student') {
                  displayFeedbacks = feedbacks.students || [];
                } else if (selectedFilter === 'parent') {
                  displayFeedbacks = feedbacks.parents || [];
                } else if (selectedFilter === 'alumni') {
                  displayFeedbacks = feedbacks.alumni || [];
                }
                
                if (displayFeedbacks.length === 0) {
                  return (
                    <div className="no-feedback">
                      <p>No {selectedFilter === 'all' ? activeTab : selectedFilter} feedback found.</p>
                    </div>
                  );
                }
                
                return displayFeedbacks.map((feedback, index) => (
                  <div key={feedback.id || index} className="feedback-item">
                    <div className="feedback-header">
                      <span className="feedback-number">#{index + 1}</span>
                      <span className="feedback-date">
                        {new Date(feedback.submittedAt || feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="feedback-content">
                      {formatFeedbackData(feedback).map((section, sectionIndex) => (
                        <div key={sectionIndex} className="feedback-section">
                          <h4>{section.title}</h4>
                          <div className="section-data">
                            {Object.entries(section.data).map(([key, value]) => (
                              <div key={key} className="data-row">
                                <strong>{key}:</strong>
                                <span>{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback/student" element={<StudentFeedbackForm />} />
          <Route path="/feedback/parent" element={<ParentFeedbackForm />} />
          <Route path="/feedback/alumni" element={<AlumniFeedbackForm />} />
          <Route path="/view" element={<ViewFeedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
