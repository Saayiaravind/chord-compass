public class Course {
  private int id;
  private String title;
  private String description;
  private double price;
  private int durationInWeeks;
  
  public Course(int id, String title, String description, double price, int durationInWeeks){
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.durationInWeeks = durationInWeeks;
  }

  public int getId(){
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public double getPrice(){
    return price;
  }

  public int getDurationInWeeks(){
    return durationInWeeks;
  }

  public void setTitle(String title){
    this.title = title;
  }

  public void setDescription(String description){
    this.description = description;
  }

  public void setPrice(double price){
    this.price = price;
  }

  public void setDurationInWeeks(int durationInWeeks){
    this.durationInWeeks = durationInWeeks;
  }
}
