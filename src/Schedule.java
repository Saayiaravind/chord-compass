public class Schedule {
  private int id;
  private int courseId;
  private int studentId;
  private String classDate;
  private String meetLink;
  private String status;

  
  public Schedule(int id, int courseId, int studentId, String classDate, String meetLink, String status){
    this.id = id;
    this.courseId = courseId;
    this.studentId = studentId;
    this.classDate = classDate;
    this.meetLink = meetLink;
    this.status = status;
  }

  public int getId(){
    return this.id;
  }

  public int getCourseId() {
    return this.courseId;
  }

  public int getStudentId() {
    return this.studentId;
  }

  public String getClassDate(){
    return this.classDate;
  }

  public String getMeetLink(){
    return this.meetLink;
  }

   public String getStatus(){
    return this.status;
  }

  public void setClassDate(String classDate){
    this.classDate = classDate;
  }

  public void setMeetLink(String meetLink){
    this.meetLink = meetLink;
  }

  public void setStatus(String status){
    this.status = status;
  }

 
}
