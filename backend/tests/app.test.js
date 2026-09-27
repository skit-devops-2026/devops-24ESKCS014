const test = require('node:test');
const assert = require('node:assert/strict');

// Helper function: Job Title Validation Logic
function isValidJobTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

// Helper function: Mock search filter logic
function filterJobs(jobs, keyword, location, category) {
  return jobs.filter(job => {
    const matchesKeyword = !keyword || 
      job.title.toLowerCase().includes(keyword.toLowerCase()) || 
      job.company.toLowerCase().includes(keyword.toLowerCase());
    const matchesLocation = !location || location === 'All' || 
      job.location.toLowerCase() === location.toLowerCase();
    const matchesCategory = !category || category === 'All' || 
      job.category.toLowerCase() === category.toLowerCase();

    return matchesKeyword && matchesLocation && matchesCategory;
  });
}

const sampleJobs = [
  { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'New York', category: 'Programming' },
  { id: 2, title: 'Data Scientist', company: 'Analytics AI', location: 'Texas', category: 'Data Science' }
];

test('Search Filter Logic - Keyword Search', () => {
  const result = filterJobs(sampleJobs, 'Frontend', null, null);
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'Frontend Developer');
});

test('Job Title Validation - Valid Job Title Returns True', () => {
  assert.equal(isValidJobTitle('Frontend Developer'), true);
  assert.equal(isValidJobTitle('DevOps Engineer'), true);
});

test('Job Title Validation - Empty String & Whitespace Return False', () => {
  assert.equal(isValidJobTitle(''), false);
  assert.equal(isValidJobTitle('   '), false);
});

test('Job Title Validation - Invalid Types Return False', () => {
  assert.equal(isValidJobTitle(123), false);
  assert.equal(isValidJobTitle(null), false);
});
