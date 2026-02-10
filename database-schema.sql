-- Chord Compass Database Schema
-- Created: 2025-01-XX

-- Drop existing tables (for clean reinstall)
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS student_enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table (authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'STUDENT')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    session_duration_minutes INTEGER DEFAULT 45,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student enrollments table (with flexible pricing)
CREATE TABLE student_enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    
    -- Payment plan type
    payment_plan VARCHAR(50) NOT NULL CHECK (payment_plan IN (
        'FIXED_MONTHLY', 
        'CLUSTER', 
        'PAY_PER_SESSION'
    )),
    
    -- Student-specific pricing
    price_amount DECIMAL(10, 2) NOT NULL,
    
    -- Plan details
    sessions_remaining INTEGER,
    validity_start_date DATE,
    validity_end_date DATE,
    
    -- Flags
    auto_renew BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- Metadata
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Schedules table (individual class sessions)
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER NOT NULL REFERENCES student_enrollments(id) ON DELETE CASCADE,
    
    -- Scheduling info
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 45,
    meet_link VARCHAR(255),
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'SCHEDULED' CHECK (status IN (
        'SCHEDULED', 
        'NOTES_PENDING', 
        'COMPLETED', 
        'CANCELLED', 
        'NO_SHOW'
    )),
    
    -- Attendance & notes (filled after class)
    attended BOOLEAN,
    class_notes TEXT,
    practice_notes TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Videos table (YouTube videos assigned to students)
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    youtube_url VARCHAR(500) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_videos_student ON videos(student_id);
CREATE INDEX idx_schedules_enrollment ON schedules(enrollment_id);
CREATE INDEX idx_schedules_date ON schedules(scheduled_date);
CREATE INDEX idx_schedules_status ON schedules(status);
CREATE INDEX idx_enrollments_student ON student_enrollments(student_id);
CREATE INDEX idx_enrollments_course ON student_enrollments(course_id);

-- Comments for documentation
COMMENT ON TABLE users IS 'User accounts for authentication (ADMIN or STUDENT roles)';
COMMENT ON TABLE students IS 'Students enrolled in Chord Compass academy';
COMMENT ON TABLE courses IS 'Available courses (Piano, Vocals, Keyboard, etc.)';
COMMENT ON TABLE student_enrollments IS 'Student enrollment records with personalized pricing plans';
COMMENT ON TABLE schedules IS 'Individual class sessions with attendance and notes';
COMMENT ON TABLE videos IS 'YouTube videos assigned by admin to individual students';
COMMENT ON COLUMN videos.youtube_url IS 'Unlisted YouTube URL - video ID extracted on frontend for embedding';

COMMENT ON COLUMN student_enrollments.payment_plan IS 'FIXED_MONTHLY: Monthly subscription, CLUSTER: Prepaid session packs, PAY_PER_SESSION: Pay after each month';
COMMENT ON COLUMN student_enrollments.price_amount IS 'For FIXED: monthly fee, For CLUSTER: total pack price, For PAY_PER_SESSION: price per session';
COMMENT ON COLUMN schedules.status IS 'Workflow: SCHEDULED → NOTES_PENDING (after class time) → COMPLETED (after adding notes)';

-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Insert users (passwords are BCrypt hashed)
-- admin@chordcompass.com / admin123
-- student@chordcompass.com / student123
INSERT INTO users (email, password, role)
VALUES
('admin@chordcompass.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjyZH/k7H9GmHWC/H.sKfPqW1.YVdS', 'ADMIN'),
('student@chordcompass.com', '$2a$10$fBgYXOJQRJdqLCE4hHhZau9u7TJFwVOoWJ5OQyA0pJLHZBOUZKp3G', 'STUDENT');

-- Insert sample students
INSERT INTO students (name, email, phone)
VALUES 
('Ravi Kumar', 'ravi@example.com', '9876543210'),
('Priya Sharma', 'priya@example.com', '9999999999'),
('Arjun Patel', 'arjun@example.com', '9123456789'),
('Ananya Singh', 'ananya@example.com', '9234567890');

-- Insert courses
INSERT INTO courses (title, description, session_duration_minutes)
VALUES 
('Western Classical Piano', 'Learn classical piano techniques and repertoire', 45),
('Carnatic Keyboard', 'Carnatic music fundamentals on keyboard', 45),
('Carnatic Vocals', 'Traditional Carnatic vocal training', 45),
('Film Keyboard', 'Bollywood and film music on keyboard', 45),
('Hybrid Piano', 'Blend of Western and Indian piano styles', 45);

-- Insert student enrollments with various payment plans
INSERT INTO student_enrollments (
    student_id, course_id, payment_plan, price_amount, 
    sessions_remaining, validity_start_date, validity_end_date, 
    auto_renew, notes
)
VALUES 
-- Ravi: Fixed monthly for Western Piano at standard rate
(1, 1, 'FIXED_MONTHLY', 6000.00, NULL, '2025-01-01', '2025-01-31', true, 'Standard pricing'),

-- Priya: Fixed monthly for Carnatic Vocals at discounted rate
(2, 3, 'FIXED_MONTHLY', 6500.00, NULL, '2025-01-01', '2025-01-31', true, '10% family discount - sister enrolled'),

-- Arjun: Cluster pack (12 sessions) for Film Keyboard
(3, 4, 'CLUSTER', 15000.00, 12, '2025-01-01', '2025-06-30', false, 'Bought 12-session pack with 7% discount'),

-- Ananya: Pay per session for Hybrid Piano
(4, 5, 'PAY_PER_SESSION', 1400.00, NULL, '2025-01-01', NULL, false, 'Loyal student - Rs. 150 discount per session');

-- Insert sample schedules
INSERT INTO schedules (
    enrollment_id, scheduled_date, scheduled_time, duration_minutes, 
    meet_link, status, attended, class_notes, practice_notes, completed_at
)
VALUES
-- Ravi's Western Piano classes (Fixed Monthly - every Saturday)
(1, '2025-01-04', '10:00:00', 45, 'https://meet.google.com/ravi-piano-sat', 'COMPLETED', true,
 'Covered C major scale. Student has good hand position.',
 'Practice C major scale 10 minutes daily. Focus on even tempo.',
 '2025-01-04 11:00:00'),

(1, '2025-01-11', '10:00:00', 45, 'https://meet.google.com/ravi-piano-sat', 'COMPLETED', true,
 'Introduced chord progressions: I-IV-V-I in C major.',
 'Memorize I-IV-V-I progression. Practice transitions smoothly.',
 '2025-01-11 11:00:00'),

(1, '2025-01-18', '10:00:00', 45, 'https://meet.google.com/ravi-piano-sat', 'NOTES_PENDING', NULL, NULL, NULL, NULL),

(1, '2025-01-25', '10:00:00', 45, 'https://meet.google.com/ravi-piano-sat', 'SCHEDULED', NULL, NULL, NULL, NULL),

-- Priya's Carnatic Vocals classes (Fixed Monthly - every Sunday)
(2, '2025-01-05', '11:00:00', 45, 'https://meet.google.com/priya-vocals-sun', 'COMPLETED', true,
 'Sarali varisai practice. Voice quality improving.',
 'Practice sarali varisai patterns 1-7 daily for 15 minutes.',
 '2025-01-05 12:00:00'),

(2, '2025-01-12', '11:00:00', 45, 'https://meet.google.com/priya-vocals-sun', 'NOTES_PENDING', NULL, NULL, NULL, NULL),

(2, '2025-01-19', '11:00:00', 45, 'https://meet.google.com/priya-vocals-sun', 'SCHEDULED', NULL, NULL, NULL, NULL),

-- Arjun's Film Keyboard classes (Cluster pack - flexible scheduling)
(3, '2025-01-06', '16:00:00', 45, 'https://meet.google.com/arjun-film-mon', 'COMPLETED', true,
 'Introduction to Bollywood chord progressions.',
 'Listen to "Tum Hi Ho" and identify chord changes.',
 '2025-01-06 17:00:00'),

(3, '2025-01-08', '17:00:00', 45, 'https://meet.google.com/arjun-film-wed', 'COMPLETED', true,
 'Practiced "Tum Hi Ho" intro section.',
 'Practice intro section slowly. Record yourself and review.',
 '2025-01-08 18:00:00'),

(3, '2025-01-13', '16:00:00', 45, 'https://meet.google.com/arjun-film-mon', 'SCHEDULED', NULL, NULL, NULL, NULL),

-- Ananya's Hybrid Piano classes (Pay per session - flexible)
(4, '2025-01-10', '14:00:00', 45, 'https://meet.google.com/ananya-hybrid-wed', 'COMPLETED', true,
 'Fusion of Western harmonies with Carnatic ragas.',
 'Experiment with Shankarabharanam raga over C major chord.',
 '2025-01-10 15:00:00'),

(4, '2025-01-17', '14:00:00', 45, 'https://meet.google.com/ananya-hybrid-wed', 'SCHEDULED', NULL, NULL, NULL, NULL);

-- Insert sample videos (unlisted YouTube links assigned to students)
INSERT INTO videos (student_id, title, youtube_url, description)
VALUES
(1, 'C Major Scale Tutorial', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Practice the C major scale with proper fingering technique'),
(1, 'Chord Progressions I-IV-V-I', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Review of chord progression patterns covered in class'),
(2, 'Sarali Varisai Patterns 1-7', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Practice along with these sarali varisai exercises'),
(3, 'Tum Hi Ho - Intro Section', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Slow breakdown of the intro section for practice');

-- Verification queries (optional - comment out in production)
-- SELECT * FROM students;
-- SELECT * FROM courses;
-- SELECT * FROM student_enrollments;
-- SELECT * FROM schedules ORDER BY scheduled_date;
-- SELECT * FROM videos;