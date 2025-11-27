import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;

public class CourseManager {
    // TODO: Add two fields - ArrayList and HashMap for courses
    private ArrayList<Course> courses;
    private HashMap<Integer, Course> courseMap;
    
    // TODO: Add constructor to initialize both collections
    public CourseManager(){
        this.courses = new ArrayList<>();
        this.courseMap = new HashMap<>();
    }
    
    // TODO: Add addCourse method
    public void addCourse(Course course){
        courses.add(course);
        courseMap.put(course.getId(), course);
        System.out.println("Added: " + course.getTitle());
    }


    // TODO: Add getAllCourses method
    public ArrayList<Course> getAllCourses(){
        return courses;
    }

    // TODO: Add getCourseCount method
    public int getCourseCount(){
        return courses.size();
    }
    
    // TODO: Add findCourseById method (using HashMap)
    public Course findCourseById(int id){
        return courseMap.get(id); //Instant lookup
    }
    
    // TODO: Add getCoursesByPriceRange method (using Stream)
    //       Filter courses where price >= minPrice AND price <= maxPrice
    public ArrayList<Course> getCoursesByPriceRange(double minPrice, double maxPrice){
        return courses.stream()
                 .filter(c -> c.getPrice() >= minPrice && c.getPrice() <= maxPrice)
                 .collect(Collectors.toCollection(ArrayList::new));
    }
    
    // TODO: Add getCoursesSortedByPrice method (using Stream)
    //       Sort courses by price (lowest to highest)
    public ArrayList<Course> getCourseSortedByPrice(){
        return courses.stream()
                 .sorted((c1,c2) -> Double.compare(c1.getPrice(), c2.getPrice()))
                 .collect(Collectors.toCollection(ArrayList::new));
    }
}
