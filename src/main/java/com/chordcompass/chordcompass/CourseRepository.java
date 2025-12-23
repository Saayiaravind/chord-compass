package com.chordcompass.chordcompass;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    //Custom query : find course by title
    // Spring auto-generates: SELECT * FROM COURSES WHERE title = ?
    Optional<Course> findByTitle(String title);
}
