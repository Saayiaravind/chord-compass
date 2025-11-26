public class Main {
    public static void main(String[] args) {
        System.out.println("Chord Compass - Music Academy Management");
        System.out.println("=========================================");
        System.out.println();

        // Create a student
        Student student1 = new Student(101, "Ravi Kumar", "ravi@example.com", "9876543210");
        
        System.out.println("Student Created:");
        System.out.println("ID: " + student1.getId());
        System.out.println("Name: " + student1.getName());
        System.out.println("Email: " + student1.getEmail());
        System.out.println("Phone: " + student1.getPhone());
        System.out.println();

        // Create a course
        Course course1 = new Course(1, "Beginner Piano", "Learn piano basics from scratch", 5999.0, 12);
        
        System.out.println("Course Created:");
        System.out.println("ID: " + course1.getId());
        System.out.println("Title: " + course1.getTitle());
        System.out.println("Description: " + course1.getDescription());
        System.out.println("Price: Rs." + course1.getPrice());
        System.out.println("Duration: " + course1.getDurationInWeeks() + " weeks");
        System.out.println();

        // Create a schedule
        Schedule schedule1 = new Schedule(1, 1, 101, "2025-12-01", "https://meet.google.com/xyz-abc-def", "SCHEDULED");
        
        System.out.println("Schedule Created:");
        System.out.println("Schedule ID: " + schedule1.getId());
        System.out.println("Course ID: " + schedule1.getCourseId());
        System.out.println("Student ID: " + schedule1.getStudentId());
        System.out.println("Class Date: " + schedule1.getClassDate());
        System.out.println("Meet Link: " + schedule1.getMeetLink());
        System.out.println("Status: " + schedule1.getStatus());

         // Test setters - update student information
        System.out.println();
        System.out.println("=========================================");
        System.out.println("Testing Setters - Updating Information");
        System.out.println("=========================================");
        System.out.println();
        
        System.out.println("Original student name: " + student1.getName());
        student1.setName("Ravi Kumar Sharma");
        System.out.println("Updated student name: " + student1.getName());
        System.out.println();
        
        System.out.println("Original course price: Rs." + course1.getPrice());
        course1.setPrice(4999.0);
        System.out.println("Updated course price: Rs." + course1.getPrice());
        System.out.println();
        
        System.out.println("Original schedule status: " + schedule1.getStatus());
        schedule1.setStatus("COMPLETED");
        System.out.println("Updated schedule status: " + schedule1.getStatus());
    

         // Test immutability - try to change IDs (this should NOT be possible)
        System.out.println();
        System.out.println("=========================================");
        System.out.println("Testing Immutability - IDs Cannot Change");
        System.out.println("=========================================");
        System.out.println();
        
        System.out.println("Student ID is: " + student1.getId());
        System.out.println("Once set, IDs cannot be changed - no setId() method exists!");
        
        // Uncomment the line below to see an error:
        //student1.setId(999);  // This will NOT compile!
    }
}
