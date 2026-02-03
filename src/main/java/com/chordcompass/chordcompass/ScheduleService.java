package com.chordcompass.chordcompass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleById(Integer id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
    }

    public Schedule createSchedule(Schedule schedule) {
        // Validate schedule has enrollment and date/time
        if (schedule.getEnrollment() == null) {
            throw new RuntimeException("Schedule must be linked to an enrollment");
        }
        if (schedule.getScheduledDate() == null || schedule.getScheduledTime() == null) {
            throw new RuntimeException("Schedule must have date and time");
        }
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Integer id, Schedule scheduleDetails) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
        
        schedule.setScheduledDate(scheduleDetails.getScheduledDate());
        schedule.setScheduledTime(scheduleDetails.getScheduledTime());
        schedule.setDurationMinutes(scheduleDetails.getDurationMinutes());
        schedule.setMeetLink(scheduleDetails.getMeetLink());
        schedule.setStatus(scheduleDetails.getStatus());
        
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Integer id) {
        if (!scheduleRepository.existsById(id)) {
            throw new RuntimeException("Schedule not found with id: " + id);
        }
        scheduleRepository.deleteById(id);
    }
}
