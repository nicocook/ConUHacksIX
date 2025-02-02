import time
import os
import signal
import json
import psutil
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)
driver.get("https://www.quebec.ca/en/health/health-system-and-services/service-organization/quebec-health-system-and-its-services/situation-in-emergency-rooms-in-quebec#situation-urgences-tab1")

all_hospitals = []
# Function to scrape hospital data from the current page
def scrape_hospital_data():
    hospital_elements = driver.find_elements(By.XPATH, "//*[contains(@class, 'hospital_element')]")

    for hospital in hospital_elements:
        try:
            # Extract hospital name
            try:
                name = hospital.find_element(By.XPATH, ".//div[contains(@class, 'font-weight-bold')]").text.strip()
            except:
                name = ""

            if not name:
                continue  

            # address
            try:
                address = hospital.find_element(By.XPATH, ".//div[contains(@class, 'adresse')]").text.strip()
            except:
                address = "N/A"

            #estimated waiting time
            try:
                waiting_time = hospital.find_element(By.XPATH, ".//li[contains(@class, 'hopital-item') and contains(., 'Estimated waiting time')]//span").text.strip()
            except:
                waiting_time = "N/A"

            #people waiting to see a doctor
            try:
                people_waiting = hospital.find_element(By.XPATH, ".//li[contains(@class, 'hopital-item') and contains(., 'Number of people waiting to see a doctor')]//span").text.strip()
            except:
                people_waiting = "N/A"

            #people in the emergency room
            try:
                total_people_er = hospital.find_element(By.XPATH, ".//li[contains(@class, 'hopital-item') and contains(., 'Total number of people in the emergency room')]//span").text.strip()
            except:
                total_people_er = "N/A"

            #occupancy rate of stretchers
            try:
                stretcher_occupancy = hospital.find_element(By.XPATH, ".//li[contains(@class, 'hopital-item') and contains(., 'Occupancy rate of stretchers')]//span").text.strip()
            except:
                stretcher_occupancy = "N/A"

            # Store
            hospital_data = {
                "name": name,
                "details": {
                    "address": address,
                    "estimated_waiting_time": waiting_time,
                    "people_waiting_to_see_doctor": people_waiting,
                    "total_people_in_emergency_room": total_people_er,
                    "stretcher_occupancy_rate": stretcher_occupancy
                }
            }
            all_hospitals.append(hospital_data)

            print(f"Hospital: {name}, Address: {address}, Estimated Waiting Time: {waiting_time}, "
                  f"People Waiting: {people_waiting}, Total in ER: {total_people_er}, Stretcher Occupancy: {stretcher_occupancy}")

        except Exception as e:
            print(f"Error processing hospital: {e}")

#navigate through pagination
def go_to_next_page():
    try:
        # Find the "Next" button
        next_button = driver.find_element(By.XPATH, "//li[@class='next']/a")

        if next_button:
            next_button.click()
            time.sleep(3)  
            return True
    except:
        return False
    return False

def clean_up():
    try:
        driver.quit()
    except Exception as e:
        print(f"Error quitting driver: {e}")

    for process in psutil.process_iter(attrs=["pid", "name"]):
        if "chromedriver" in process.info["name"].lower():
            os.kill(process.info["pid"], signal.SIGTERM)

while True:
    scrape_hospital_data()
    if not go_to_next_page():
        break  


output_file = "hospital_data.ts"

# Convert JSON to TypeScript
json_data = json.dumps(all_hospitals, indent=4, ensure_ascii=False)

ts_content = "export const data = " + json_data.replace('"name":', 'name:') \
                                              .replace('"details":', 'details:') \
                                              .replace('"address":', 'address:') \
                                              .replace('"estimated_waiting_time":', 'estimated_waiting_time:') \
                                              .replace('"people_waiting_to_see_doctor":', 'people_waiting_to_see_doctor:') \
                                              .replace('"total_people_in_emergency_room":', 'total_people_in_emergency_room:') \
                                              .replace('"stretcher_occupancy_rate":', 'stretcher_occupancy_rate:') + ";"

with open(output_file, "w", encoding="utf-8") as file:
    file.write(ts_content)

clean_up()


