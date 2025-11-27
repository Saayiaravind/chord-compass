import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        System.out.println("Chord Compass - Music Academy Management");
        System.out.println("=========================================\n");

        // Create StudentManager
        StudentManager manager = new StudentManager();

        // Add multiple students
        manager.addStudent(new Student(101, "Ravi Kumar", "ravi@example.com", "9876543210"));
        manager.addStudent(new Student(102, "Priya Sharma", "priya@example.com", "9988776655"));
        manager.addStudent(new Student(103, "Arjun Patel", "arjun@example.com", "9123456789"));
        manager.addStudent(new Student(104, "Ananya Singh", "ananya@example.com", "9234567890"));
        manager.addStudent(new Student(105, "Karthik Reddy", "karthik@example.com", "9345678901"));

        // Display all students
        manager.displayAllStudents(); 

        // Show count
        System.out.println("Total students enrolled: " + manager.getStudentCount());

        // Compare performance: ArrayList vs HashMap
        System.out.println("\n=========================================");
        System.out.println("Performance Comparison: ArrayList vs HashMap");
        System.out.println("=========================================\n");

        // ArrayList search (slow)
        long startTime = System.nanoTime();
        Student result1 = manager.findStudentByIdSlow(105);
        long endTime = System.nanoTime();
        long arrayListTime = endTime - startTime;
        System.out.println("ArrayList search: Found " + result1.getName());
        System.out.println("Time taken: " + arrayListTime + " nanoseconds\n");

        // HashMap search (fast)
        startTime = System.nanoTime();
        Student result2 = manager.findStudentByIdFast(105);
        endTime = System.nanoTime();
        long hashMapTime = endTime - startTime;
        System.out.println("HashMap search: Found " + result2.getName());
        System.out.println("Time taken: " + hashMapTime + " nanoseconds\n");

        // Compare
        if (arrayListTime > hashMapTime) {
            double times = (double) arrayListTime / hashMapTime;
            System.out.println("HashMap is " + String.format("%.2f", times) + "x faster!");
        }

        //Test email search

        Student byEmail = manager.findStudentbyEmail("priya@example.com");
        if(byEmail != null){
            System.out.println("Found by email: " + byEmail.getName() + " (ID: " + byEmail.getId() + ")");
        }

        //Test keyword search
        ArrayList<Student> results = manager.findStudentsByNameKeyword("kumar");
        System.out.println("Students with 'kumar' in their name:");
        for(Student s : results) {
            System.out.println(" - " + s.getName());
        }   

        System.out.println("Traditional loop:");
        ArrayList<Student> traditional = manager.findStudentsByNameKeyword("a");
        for(Student s : traditional) {
            System.out.println(" - " + s.getName());
        }

        System.out.println("Count: " + traditional.size());

        System.out.println();

        //Stream way 
        System.out.println("Stream approach:");
        ArrayList<Student> streamed = manager.findStudentsByNameStream("a");
        for(Student s:streamed) {
            System.out.println(" - " + s.getName());
        }
        System.out.println("Count: " + streamed.size());
        System.out.println();
        long count = manager.countStudentsByKeyword("a");
        System.out.println("Stream count (without creating list): "+ count);

        System.out.println();

        //Get just the names (Stream map example)
        System.out.println("All student names (using map):");
        ArrayList<String> names = manager.getAllStudentNames();
        for (String name : names) {
            System.out.println(" -" + name);
        }

         // Test sorting
        System.out.println("\n=========================================");
        System.out.println("Sorting Students");
        System.out.println("=========================================\n");

        System.out.println("Students sorted by name (A-Z):");
        ArrayList<Student> sortedByName = manager.getStudentsSortedByName();
        for (Student s : sortedByName) {
            System.out.println("  " + s.getId() + " - " + s.getName());
        }

        System.out.println("\nStudents sorted by ID (descending):");
        ArrayList<Student> sortedById = manager.getStudentsSortedByIdDescending();
        for (Student s : sortedById) {
            System.out.println("  " + s.getId() + " - " + s.getName());
        }

        // Test chaining
        System.out.println("\n=========================================");
        System.out.println("Chained Operations: Filter + Sort + Map");
        System.out.println("=========================================\n");

        System.out.println("Names containing 'a', sorted alphabetically:");
        ArrayList<String> filteredSorted = manager.getNamesWithKeywordSorted("a");
        for (String name : filteredSorted) {
            System.out.println("  - " + name);
        }

          // Test CourseManager
        System.out.println("\n=========================================");
        System.out.println("Testing CourseManager");
        System.out.println("=========================================\n");

        CourseManager courseManager = new CourseManager();

        // Add courses
        courseManager.addCourse(new Course(1, "Beginner Piano", "Learn piano from scratch", 5999.0, 12));
        courseManager.addCourse(new Course(2, "Carnatic Vocals", "Classical Indian singing", 7999.0, 16));
        courseManager.addCourse(new Course(3, "Western Music Theory", "Music theory basics", 3999.0, 8));
        courseManager.addCourse(new Course(4, "Advanced Piano", "Advanced techniques", 8999.0, 12));
        courseManager.addCourse(new Course(5, "Carnatic Keyboard", "Keyboard with carnatic style", 6999.0, 12));

        System.out.println("\nTotal courses: " + courseManager.getCourseCount());

        // Test price range filter
        System.out.println("\n--- Courses between Rs.4000-7000 ---");
        ArrayList<Course> affordable = courseManager.getCoursesByPriceRange(4000, 7000);
        for (Course c : affordable) {
            System.out.println("  " + c.getTitle() + " - Rs." + c.getPrice());
        }

        // Test sorting by price
        System.out.println("\n--- All Courses Sorted by Price (Ascending) ---");
        ArrayList<Course> sorted = courseManager.getCourseSortedByPrice();
        for (Course c : sorted) {
            System.out.println("  Rs." + c.getPrice() + " - " + c.getTitle());
        }

        // Test find by ID
        System.out.println("\n--- Find Course by ID ---");
        Course found = courseManager.findCourseById(2);
        if (found != null) {
            System.out.println("Found: " + found.getTitle() + " (" + found.getDurationInWeeks() + " weeks)");
        }
    }
}