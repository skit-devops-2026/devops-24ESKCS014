const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

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

// Helper function: Modal visibility toggle state tracker
class ModalController {
  constructor() {
    this.isOpen = false;
  }
  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }
}

// Sample job dataset
const sampleJobs = [
  { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'New York', category: 'Programming' },
  { id: 2, title: 'Data Scientist', company: 'Analytics AI', location: 'Texas', category: 'Data Science' },
  { id: 3, title: 'UI/UX Designer', company: 'Creative Studio', location: 'Mumbai', category: 'Designing' },
  { id: 4, title: 'Cyber Security Analyst', company: 'SecureNet', location: 'Hyderabad', category: 'Cybersecurity' }
];

test('Search Filter Logic - Keyword Search', () => {
  const result = filterJobs(sampleJobs, 'Frontend', null, null);
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'Frontend Developer');
});

test('Search Filter Logic - Location Filter', () => {
  const result = filterJobs(sampleJobs, null, 'Texas', null);
  assert.equal(result.length, 1);
  assert.equal(result[0].company, 'Analytics AI');
});

test('Search Filter Logic - Category Filter', () => {
  const result = filterJobs(sampleJobs, null, null, 'Designing');
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'UI/UX Designer');
});

test('Search Filter Logic - No Match Return Empty Array', () => {
  const result = filterJobs(sampleJobs, 'NonExistentJob', null, null);
  assert.equal(result.length, 0);
});

test('Modal Controller State Management', () => {
  const modal = new ModalController();
  assert.equal(modal.isOpen, false);

  modal.open();
  assert.equal(modal.isOpen, true);

  modal.close();
  assert.equal(modal.isOpen, false);
});

test('Project Structure Verification - index.html Exists & Valid', () => {
  const indexPath = path.join(__dirname, '..', 'index.html');
  assert.equal(fs.existsSync(indexPath), true, 'index.html must exist in repository root');

  const content = fs.readFileSync(indexPath, 'utf-8');
  assert.match(content, /<!DOCTYPE html>/i, 'index.html should have valid DOCTYPE tag');
  assert.match(content, /<html/i, 'index.html should have html tag');
});
