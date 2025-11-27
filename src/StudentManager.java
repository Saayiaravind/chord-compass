import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;

public class StudentManager {
    private ArrayList<Student> students;
    private HashMap<Integer, Student> studentMap;

    // Constructor
    public StudentManager() {
        this.students = new ArrayList<>();
        this.studentMap = new HashMap<>();
    }

    // Add a student (to both structures)
    public void addStudent(Student student) {
        students.add(student);
        studentMap.put(student.getId(), student);
        System.out.println("Added: " + student.getName());
    }

    // Get all students
    public ArrayList<Student> getAllStudents() {
        return students;
    }

    // Get count of students
    public int getStudentCount() {
        return students.size();
    }

    // Display all students
    public void displayAllStudents() {
        System.out.println("\n=== All Students ===");
        for (Student s : students) {
            System.out.println("ID: " + s.getId() + " | Name: " + s.getName() + " | Email: " + s.getEmail());
        }
        System.out.println("Total: " + students.size() + " students\n");
    }

    // Find student by ID (traditional way - using ArrayList)
    public Student findStudentByIdSlow(int id) {
        for (Student s : students) {
            if (s.getId() == id) {
                return s;
            }
        }
        return null;
    }

    // Find student by ID (fast way - using HashMap)
    public Student findStudentByIdFast(int id) {
        return studentMap.get(id);  // Instant lookup!
    }

    //Find student by email (using lambda)
    public Student findStudentbyEmail(String email) {
        for(Student s : students){
            if(s.getEmail().equals(email)) {
                return s;
            }
        }
        return null;
    }

    //Find all students whose name contains a keyword
    public ArrayList<Student> findStudentsByNameKeyword(String keyword){
        ArrayList<Student> results = new ArrayList<>();
        for(Student s : students){
            if(s.getName().toLowerCase().contains(keyword.toLowerCase())) {
                results.add(s);
            }
        }
        return results;
    }

    //Find student by ID using stream
    public Student findStudentByIdStream(int id){
        return students.stream()
                   .filter(s -> s.getId() == id)
                   .findFirst()
                   .orElse(null);
    }

    //Find students by name keyword using stream
    public ArrayList<Student> findStudentsByNameStream(String keyword){
        return students.stream()
                 .filter(s -> s.getName().toLowerCase().contains(keyword.toLowerCase()))
                 .collect(Collectors.toCollection(ArrayList::new));
    }

    //Get all student names (Stream + map example)
    public ArrayList<String> getAllStudentNames() {
        return students.stream()
                 .map(s -> s.getName())
                 .collect(Collectors.toCollection(ArrayList::new));
    }

    //Count students with name containing keyword
    public long countStudentsByKeyword(String keyword) {
        return students.stream()
                  .filter(s -> s.getName().toLowerCase().contains(keyword.toLowerCase()))
                  .count();
    }

    //Get students sorted by name
    public ArrayList<Student> getStudentsSortedByName(){
        return students.stream()
                  .sorted((s1,s2) -> s1.getName().compareTo(s2.getName()))
                  .collect(Collectors.toCollection(ArrayList::new));
    }

    //Get students sorted by ID(descending)
    public ArrayList<Student> getStudentsSortedByIdDescending() {
        return students.stream()
                 .sorted((s1, s2) -> s2.getId()- s1.getId())
                 .collect(Collectors.toCollection(ArrayList::new));
    }

    //Complex example: Filter + Sort + Map
    //Get the names of students with "a" in name, sorted alphabetically
    public ArrayList<String> getNamesWithKeywordSorted(String keyword){
        return students.stream()
                .filter(s -> s.getName().toLowerCase().contains(keyword.toLowerCase()))
                .sorted((s1,s2) -> s1.getName().compareTo(s2.getName()))
                .map(s -> s.getName())
                .collect(Collectors.toCollection(ArrayList::new)); 
            }
        }
    
