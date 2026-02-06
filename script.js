// DOM Elements
const codeInput = document.getElementById('codeInput');
const charCount = document.getElementById('charCount');
const languageSelect = document.getElementById('languageSelect');
const themeToggle = document.getElementById('themeToggle');
const uploadBtn = document.getElementById('uploadBtn');
const clearBtn = document.getElementById('clearBtn');
const sampleBtn = document.getElementById('sampleBtn');
const formatBtn = document.getElementById('formatBtn');
const reviewBtn = document.getElementById('reviewBtn');
const fileUpload = document.getElementById('fileUpload');
const dropZone = document.getElementById('dropZone');
const issuesList = document.getElementById('issuesList');
const filterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const loadingOverlay = document.getElementById('loadingOverlay');
const notification = document.getElementById('notification');

// Count Elements
const criticalCount = document.getElementById('criticalCount');
const majorCount = document.getElementById('majorCount');
const minorCount = document.getElementById('minorCount');
const qualityScore = document.getElementById('qualityScore');

// Detail Elements
const securityIssues = document.getElementById('securityIssues');
const performanceIssues = document.getElementById('performanceIssues');
const bestPracticeIssues = document.getElementById('bestPracticeIssues');

// Metrics Elements
const linesOfCode = document.getElementById('linesOfCode');
const functionsCount = document.getElementById('functionsCount');
const complexityScore = document.getElementById('complexityScore');
const maintainabilityIndex = document.getElementById('maintainabilityIndex');

// Status Elements
const statusText = document.getElementById('statusText');
const statusDot = document.getElementById('statusDot');

// Sample code for different languages
const sampleCode = {
    python: `def calculate_factorial(n):
    """Calculate factorial of a number."""
    if n < 0:
        return None
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

def insecure_password_check(password):
    # Security issue: weak password check
    if password == "admin123":
        return True
    return False

def process_data(data_list):
    # Performance issue: O(n^2) complexity
    result = []
    for i in range(len(data_list)):
        for j in range(len(data_list)):
            if data_list[i] == data_list[j]:
                result.append((i, j))
    return result`,
    
    javascript: `function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

// Security issue: innerHTML usage
function renderContent(content) {
    document.getElementById('content').innerHTML = content;
}

// Performance issue: multiple DOM queries in loop
function updateElements() {
    for (let i = 0; i < 100; i++) {
        document.querySelector('.item').style.color = 'red';
    }
}`,
    
    java: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    // Security issue: hardcoded credentials
    private String password = "password123";
    
    // Performance issue: string concatenation in loop
    public String buildString(String[] parts) {
        String result = "";
        for (String part : parts) {
            result += part;
        }
        return result;
    }
}`,
    
    cpp: `#include <iostream>
#include <vector>

// Security issue: buffer overflow potential
void copyString(char* dest, const char* src) {
    int i = 0;
    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';
}

// Performance issue: pass by value
void processVector(std::vector<int> data) {
    for (int i = 0; i < data.size(); i++) {
        std::cout << data[i] << std::endl;
    }
}`,
    
    php: `<?php
function getUserData($userId) {
    // Security issue: SQL injection
    $query = "SELECT * FROM users WHERE id = " . $userId;
    $result = mysql_query($query);
    return mysql_fetch_assoc($result);
}

// Security issue: XSS vulnerability
function displayMessage($message) {
    echo "<div>" . $message . "</div>";
}

// Performance issue: file operations in loop
function readMultipleFiles($files) {
    foreach ($files as $file) {
        $content = file_get_contents($file);
        echo $content;
    }
}
?>`,
    
    ruby: `def calculate_discount(price, discount_rate)
    # Security issue: direct eval
    discount = eval(discount_rate.to_s)
    price - discount
end

# Performance issue: nested loops
def find_pairs(arr)
    pairs = []
    arr.each do |item1|
        arr.each do |item2|
            pairs << [item1, item2] if item1 == item2
        end
    end
    pairs
end`,
    
    go: `package main

import "fmt"

// Security issue: command injection
func executeCommand(userInput string) {
    cmd := exec.Command("sh", "-c", userInput)
    cmd.Run()
}

// Performance issue: slice allocation in loop
func processItems(items []string) {
    var result []string
    for i := 0; i < len(items); i++ {
        result = append(result, items[i])
    }
}`,
    
    rust: `fn process_input(input: &str) {
    // Security issue: panic on invalid input
    let num: i32 = input.parse().unwrap();
    println!("Number: {}", num);
}

// Performance issue: unnecessary cloning
fn duplicate_vector(vec: Vec<String>) -> Vec<String> {
    let mut result = Vec::new();
    for item in vec {
        result.push(item.clone());
    }
    result
}`,
    
    typescript: `interface User {
    name: string;
    email: string;
}

// Security issue: type assertion without checking
function processUser(user: any) {
    const typedUser = user as User;
    console.log(typedUser.email);
}

// Performance issue: expensive operation in render
function renderList(items: string[]) {
    return items.map(item => {
        // Expensive calculation on each render
        const processed = expensiveCalculation(item);
        return <div key={item}>{processed}</div>;
    });
}`
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCharCount();
    setupEventListeners();
    setupDragAndDrop();
    updateSampleCode();
    updateCodeMetrics();
});

// Event Listeners
function setupEventListeners() {
    // Code input events
    codeInput.addEventListener('input', updateCharCount);
    codeInput.addEventListener('input', updateCodeMetrics);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Language selector
    languageSelect.addEventListener('change', updateSampleCode);
    
    // Toolbar buttons
    uploadBtn.addEventListener('click', () => fileUpload.click());
    clearBtn.addEventListener('click', clearCode);
    sampleBtn.addEventListener('click', loadSampleCode);
    formatBtn.addEventListener('click', formatCode);
    reviewBtn.addEventListener('click', analyzeCode);
    
    // File upload
    fileUpload.addEventListener('change', handleFileUpload);
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterIssues(btn.dataset.filter);
        });
    });
    
    // Tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
        });
    });
    
    // Mobile menu toggle
    document.querySelector('.menu-toggle').addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
}

// Drag and Drop
function setupDragAndDrop() {
    dropZone.addEventListener('click', () => fileUpload.click());
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.style.borderColor = '#6366f1';
        dropZone.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
    }
    
    function unhighlight() {
        dropZone.style.borderColor = '';
        dropZone.style.backgroundColor = '';
    }
    
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            readFile(files[0]);
        }
    }
}

// Functions
function updateCharCount() {
    const count = codeInput.value.length;
    charCount.textContent = count.toLocaleString();
}

function updateCodeMetrics() {
    const code = codeInput.value;
    const lines = code.split('\n').length;
    const functions = (code.match(/def\s+\w+|function\s+\w+|public\s+\w+\s+\w+\(|fn\s+\w+|func\s+\w+/g) || []).length;
    const classes = (code.match(/class\s+\w+|interface\s+\w+/g) || []).length;
    const complexity = Math.min(Math.floor(lines / 10) + functions * 3 + classes * 2, 100);
    const maintainability = Math.max(100 - complexity, 20);
    
    linesOfCode.textContent = lines;
    functionsCount.textContent = functions + classes;
    complexityScore.textContent = complexity;
    maintainabilityIndex.textContent = maintainability;
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span') || document.createElement('span');
    
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        text.textContent = ' Light';
        themeToggle.appendChild(text);
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = ' Dark';
        themeToggle.appendChild(text);
    }
}

function updateSampleCode() {
    const lang = languageSelect.value;
    if (sampleCode[lang]) {
        codeInput.placeholder = `Paste your ${lang} code here...`;
    }
}

function clearCode() {
    codeInput.value = '';
    updateCharCount();
    updateCodeMetrics();
    showNotification('Code cleared successfully');
}

function loadSampleCode() {
    const lang = languageSelect.value;
    codeInput.value = sampleCode[lang] || sampleCode.python;
    updateCharCount();
    updateCodeMetrics();
    showNotification('Sample code loaded');
}

function formatCode() {
    const lang = languageSelect.value;
    let code = codeInput.value;
    
    // Simple formatting based on language
    switch(lang) {
        case 'python':
            // Indent Python code
            code = code.replace(/^(\s*)/gm, (match) => {
                const indent = Math.floor(match.length / 4) * 4;
                return ' '.repeat(indent);
            });
            break;
        case 'javascript':
        case 'java':
        case 'cpp':
        case 'typescript':
            // Add semicolons if missing at end of lines
            code = code.replace(/([^;{}])\n/g, '$1;\n');
            // Basic indentation
            code = code.replace(/^\s*/gm, (match) => {
                const indent = Math.floor(match.length / 2) * 2;
                return ' '.repeat(indent);
            });
            break;
    }
    
    codeInput.value = code;
    showNotification('Code formatted');
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        readFile(file);
    }
}

function readFile(file) {
    if (file.size > 1048576) { // 1MB limit
        showNotification('File too large. Maximum size is 1MB.', true);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        codeInput.value = e.target.result;
        updateCharCount();
        updateCodeMetrics();
        
        // Try to detect language from file extension
        const ext = file.name.split('.').pop().toLowerCase();
        const langMap = {
            'py': 'python',
            'js': 'javascript',
            'jsx': 'javascript',
            'java': 'java',
            'cpp': 'cpp',
            'cc': 'cpp',
            'cxx': 'cpp',
            'php': 'php',
            'rb': 'ruby',
            'go': 'go',
            'rs': 'rust',
            'ts': 'typescript',
            'tsx': 'typescript'
        };
        
        if (langMap[ext]) {
            languageSelect.value = langMap[ext];
            updateSampleCode();
        }
        
        showNotification(`File "${file.name}" loaded successfully`);
    };
    
    reader.readAsText(file);
}

function analyzeCode() {
    const code = codeInput.value.trim();
    if (!code) {
        showNotification('Please enter some code to analyze', true);
        return;
    }
    
    // Show loading overlay
    loadingOverlay.style.display = 'flex';
    statusText.textContent = 'Analyzing...';
    statusDot.style.backgroundColor = '#f59e0b';
    
    // Animate loading steps
    const steps = document.querySelectorAll('.loading-step');
    let stepIndex = 0;
    
    const stepInterval = setInterval(() => {
        steps.forEach(step => step.classList.remove('active'));
        if (stepIndex < steps.length) {
            steps[stepIndex].classList.add('active');
            stepIndex++;
        }
    }, 500);
    
    // Simulate AI analysis with timeout
    setTimeout(() => {
        clearInterval(stepInterval);
        steps.forEach(step => step.classList.remove('active'));
        steps[steps.length - 1].classList.add('active');
        
        setTimeout(() => {
            performAnalysis(code);
            loadingOverlay.style.display = 'none';
            statusText.textContent = 'Analysis complete';
            statusDot.style.backgroundColor = '#10b981';
            showNotification('Code analysis completed successfully');
        }, 500);
    }, 2500);
}

function performAnalysis(code) {
    const lang = languageSelect.value;
    const lines = code.split('\n').length;
    
    // Generate simulated issues based on code content
    const issues = generateIssues(code, lang);
    const metrics = calculateMetrics(code, lang);
    
    // Update summary counts
    const critical = issues.filter(i => i.severity === 'critical').length;
    const major = issues.filter(i => i.severity === 'major').length;
    const minor = issues.filter(i => i.severity === 'minor').length;
    const score = Math.max(100 - (critical * 10 + major * 5 + minor * 2), 0);
    
    criticalCount.textContent = critical;
    majorCount.textContent = major;
    minorCount.textContent = minor;
    qualityScore.textContent = score;
    
    // Update details
    updateDetails(issues, lang);
    
    // Display issues
    displayIssues(issues);
    
    // Update metrics
    updateCodeMetrics();
}

function generateIssues(code, lang) {
    const issues = [];
    const lines = code.split('\n');
    
    // Check for security issues
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        
        // Check for eval/exec usage
        if (line.includes('eval(') || line.includes('exec(') || line.includes('eval ')) {
            issues.push({
                severity: 'critical',
                title: 'Use of eval() or exec()',
                line: lineNum,
                description: 'Using eval() or exec() can lead to code injection vulnerabilities.',
                suggestion: 'Use safer alternatives like ast.literal_eval() or proper parsing.'
            });
        }
        
        // Check for hard-coded credentials
        if ((line.includes('password') || line.includes('secret') || line.includes('key')) && 
            (line.includes('123') || line.includes('pass') || line.includes('admin'))) {
            issues.push({
                severity: 'critical',
                title: 'Hard-coded credentials',
                line: lineNum,
                description: 'Hard-coded passwords or secrets in source code.',
                suggestion: 'Use environment variables or secure credential storage.'
            });
        }
        
        // Check for SQL injection
        if (line.includes('SELECT') && line.includes('+') && line.includes('WHERE')) {
            issues.push({
                severity: 'critical',
                title: 'Potential SQL injection',
                line: lineNum,
                description: 'String concatenation in SQL queries can lead to SQL injection.',
                suggestion: 'Use parameterized queries or prepared statements.'
            });
        }
        
        // Check for XSS vulnerabilities
        if (line.includes('innerHTML') || line.includes('document.write') || line.includes('.html(')) {
            issues.push({
                severity: 'major',
                title: 'Potential XSS vulnerability',
                line: lineNum,
                description: 'Direct DOM manipulation can lead to XSS attacks.',
                suggestion: 'Use textContent or proper sanitization libraries.'
            });
        }
        
        // Check for command injection
        if ((line.includes('exec(') || line.includes('system(') || line.includes('popen(')) && 
            line.includes('$') || line.includes('+')) {
            issues.push({
                severity: 'critical',
                title: 'Command injection risk',
                line: lineNum,
                description: 'User input directly passed to system commands.',
                suggestion: 'Use whitelisting and proper input validation.'
            });
        }
    });
    
    // Check for performance issues
    let forLoopCount = 0;
    let nestedLoopLine = -1;
    
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        
        // Count for loops
        if (line.includes('for ') || line.includes('for(') || line.includes('for(')) {
            forLoopCount++;
            if (forLoopCount > 1 && nestedLoopLine === -1) {
                nestedLoopLine = lineNum;
            }
        }
        
        // Check for string concatenation in loops
        if ((line.includes('+=') || line.includes('append(') || line.includes('push(')) && 
            forLoopCount > 0) {
            issues.push({
                severity: 'minor',
                title: 'String concatenation in loop',
                line: lineNum,
                description: 'Repeated string concatenation in loops is inefficient.',
                suggestion: 'Use array.join() or string builders.'
            });
        }
        
        // Check for unnecessary computations in loops
        if (line.includes('.length') || line.includes('.size()') || line.includes('len(')) {
            if (forLoopCount > 0) {
                issues.push({
                    severity: 'minor',
                    title: 'Repeated length calculation',
                    line: lineNum,
                    description: 'Length/size calculation inside loop is inefficient.',
                    suggestion: 'Calculate length once before the loop.'
                });
            }
        }
    });
    
    // Add nested loop issue if found
    if (forLoopCount > 1 && nestedLoopLine !== -1) {
        issues.push({
            severity: 'major',
            title: 'Nested loops detected',
            line: nestedLoopLine,
            description: 'Nested loops can lead to O(n²) time complexity.',
            suggestion: 'Consider using hash maps or more efficient algorithms.'
        });
    }
    
    // Check for best practices
    const functionCount = (code.match(/def\s+\w+|function\s+\w+|public\s+\w+\s+\w+\(|fn\s+\w+|func\s+\w+/g) || []).length;
    
    if (lines.length > 50 && functionCount < 3) {
        issues.push({
            severity: 'minor',
            title: 'Large monolithic function/file',
            line: 1,
            description: 'Code could benefit from better modularization.',
            suggestion: 'Break down into smaller, focused functions/modules.'
        });
    }
    
    // Check for broad exception handling
    lines.forEach((line, index) => {
        const lineNum = index + 1;
        
        if (line.includes('except:') || line.includes('catch(Exception') || 
            line.includes('catch(...)') || line.includes('rescue => e')) {
            issues.push({
                severity: 'minor',
                title: 'Broad exception handling',
                line: lineNum,
                description: 'Catching all exceptions can hide bugs.',
                suggestion: 'Catch specific exceptions instead of using bare except.'
            });
        }
        
        // Check for magic numbers
        if (line.match(/\b\d{3,}\b/) && !line.includes('//') && !line.includes('#')) {
            issues.push({
                severity: 'minor',
                title: 'Magic number',
                line: lineNum,
                description: 'Hard-coded numeric value without explanation.',
                suggestion: 'Use named constants or configuration variables.'
            });
        }
    });
    
    // Check for missing documentation
    if (functionCount > 0) {
        const docCommentCount = (code.match(/""".*?"""|\/\*\*[\s\S]*?\*\//g) || []).length;
        if (docCommentCount < functionCount / 2) {
            issues.push({
                severity: 'minor',
                title: 'Insufficient documentation',
                line: 1,
                description: 'Functions/classes lack proper documentation.',
                suggestion: 'Add docstrings or comments to explain functionality.'
            });
        }
    }
    
    return issues;
}

function calculateMetrics(code, lang) {
    const lines = code.split('\n').length;
    const functions = (code.match(/def\s+\w+|function\s+\w+|public\s+\w+\s+\w+\(|fn\s+\w+|func\s+\w+/g) || []).length;
    const classes = (code.match(/class\s+\w+|interface\s+\w+|struct\s+\w+/g) || []).length;
    const comments = (code.match(/#[^\n]*|\/\/[^\n]*|\/\*[\s\S]*?\*\//g) || []).length;
    
    return {
        lines,
        functions,
        classes,
        comments,
        commentRatio: lines > 0 ? Math.round((comments / lines) * 100) : 0
    };
}

function updateDetails(issues, lang) {
    const securityIssuesList = issues.filter(i => 
        i.title.includes('eval') || 
        i.title.includes('password') ||
        i.title.includes('SQL') ||
        i.title.includes('XSS') ||
        i.title.includes('injection') ||
        i.title.includes('secret')
    );
    
    const performanceIssuesList = issues.filter(i => 
        i.title.includes('loop') || 
        i.title.includes('performance') ||
        i.title.includes('concatenation') ||
        i.title.includes('length') ||
        i.title.includes('O(')
    );
    
    const bestPracticeIssuesList = issues.filter(i => 
        i.title.includes('function') || 
        i.title.includes('exception') ||
        i.title.includes('documentation') ||
        i.title.includes('magic') ||
        i.severity === 'minor'
    );
    
    securityIssues.innerHTML = securityIssuesList.length > 0 
        ? securityIssuesList.map(i => `<div class="issue-detail"><strong>Line ${i.line}:</strong> ${i.title} - ${i.description}</div>`).join('')
        : '<div class="issue-detail">No security vulnerabilities detected. Good job!</div>';
        
    performanceIssues.innerHTML = performanceIssuesList.length > 0
        ? performanceIssuesList.map(i => `<div class="issue-detail"><strong>Line ${i.line}:</strong> ${i.title} - ${i.description}</div>`).join('')
        : '<div class="issue-detail">No performance issues detected. Code is efficient!</div>';
        
    bestPracticeIssues.innerHTML = bestPracticeIssuesList.length > 0
        ? bestPracticeIssuesList.map(i => `<div class="issue-detail"><strong>Line ${i.line}:</strong> ${i.title} - ${i.description}</div>`).join('')
        : '<div class="issue-detail">Following language best practices. Excellent!</div>';
}

function displayIssues(issues) {
    if (issues.length === 0) {
        issuesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-code-branch"></i>
                </div>
                <h3>No Issues Found</h3>
                <p>Your code appears clean! Click "Analyze Code" to perform a review.</p>
            </div>
        `;
        return;
    }
    
    issuesList.innerHTML = issues.map(issue => `
        <div class="issue-item" data-severity="${issue.severity}">
            <div class="issue-header">
                <div class="issue-title">
                    <i class="fas fa-bug"></i>
                    ${issue.title}
                </div>
                <div class="issue-badge ${issue.severity}-badge">
                    ${issue.severity.toUpperCase()}
                </div>
            </div>
            <div class="issue-line">
                <i class="fas fa-code"></i> Line ${issue.line}
            </div>
            <div class="issue-desc">
                ${issue.description}
            </div>
            <div class="issue-suggestion">
                <strong>Suggestion:</strong> ${issue.suggestion}
            </div>
        </div>
    `).join('');
}

function filterIssues(filter) {
    const issues = document.querySelectorAll('.issue-item');
    let visibleCount = 0;
    
    issues.forEach(issue => {
        if (filter === 'all' || issue.dataset.severity === filter) {
            issue.style.display = 'block';
            visibleCount++;
        } else {
            issue.style.display = 'none';
        }
    });
    
    // If no issues visible after filtering, show empty state
    if (visibleCount === 0 && issues.length > 0) {
        issuesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-filter"></i>
                </div>
                <h3>No ${filter} issues</h3>
                <p>Try selecting a different filter to see other issues.</p>
            </div>
        `;
    }
}

function showNotification(message, isError = false) {
    const text = document.getElementById('notificationText');
    const icon = notification.querySelector('i');
    
    text.textContent = message;
    notification.style.backgroundColor = isError ? '#ef4444' : '#10b981';
    icon.className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'var(--dark)';
        navLinks.style.padding = '1rem';
        navLinks.style.gap = '1rem';
        navLinks.style.borderBottom = '1px solid var(--border)';
    }
}

// Initialize code metrics on page load
updateCodeMetrics();