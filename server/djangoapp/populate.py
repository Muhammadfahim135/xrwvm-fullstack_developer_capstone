import json
import os
from .models import CarMake, CarModel


def initiate():
    car_make_data = [
        {"name": "NISSAN", "description": "Great cars. Japanese technology"},
        {"name": "Mercedes", "description": "Set the standard in luxury and performance"},
        {"name": "Audi", "description": "Vorsprung durch Technik"},
        {"name": "Kia", "description": "Movement that inspires"},
        {"name": "Toyota", "description": "Reliable and durable vehicles"},
    ]

    car_make_instances = []
    for data in car_make_data:
        car_make, _ = CarMake.objects.get_or_create(
            name=data['name'],
            defaults={'description': data['description']}
        )
        car_make_instances.append(car_make)

    # Populate from car_records.json if available
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, 'database', 'data', 'car_records.json')
    if os.path.exists(json_path):
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                cars = data.get('cars', [])
                for car in cars:
                    make_name = car['make']
                    model_name = car['model']
                    body_type = car.get('bodyType', 'Sedan')
                    year = car.get('year', 2020)
                    make_obj, _ = CarMake.objects.get_or_create(
                        name=make_name,
                        defaults={'description': f"{make_name} manufacturer"}
                    )
                    CarModel.objects.get_or_create(
                        car_make=make_obj,
                        name=model_name,
                        defaults={'type': body_type, 'year': year}
                    )
                print(f"Populated {CarModel.objects.count()} models from car_records.json")
                return
        except Exception as e:
            print(f"Error loading car_records.json: {e}")

    # Fallback default models if file not read
    car_model_data = [
        {"name": "Pathfinder", "type": "SUV", "year": 2023, "car_make": car_make_instances[0]},
        {"name": "Qashqai", "type": "SUV", "year": 2023, "car_make": car_make_instances[0]},
        {"name": "XTRAIL", "type": "SUV", "year": 2023, "car_make": car_make_instances[0]},
        {"name": "A-Class", "type": "SUV", "year": 2023, "car_make": car_make_instances[1]},
        {"name": "C-Class", "type": "Sedan", "year": 2023, "car_make": car_make_instances[1]},
        {"name": "E-Class", "type": "Sedan", "year": 2023, "car_make": car_make_instances[1]},
        {"name": "A4", "type": "Sedan", "year": 2023, "car_make": car_make_instances[2]},
        {"name": "A5", "type": "Sedan", "year": 2023, "car_make": car_make_instances[2]},
        {"name": "A6", "type": "Sedan", "year": 2023, "car_make": car_make_instances[2]},
        {"name": "Sorrento", "type": "SUV", "year": 2023, "car_make": car_make_instances[3]},
        {"name": "Carnival", "type": "SUV", "year": 2023, "car_make": car_make_instances[3]},
        {"name": "Cerato", "type": "Sedan", "year": 2023, "car_make": car_make_instances[3]},
        {"name": "Corolla", "type": "Sedan", "year": 2023, "car_make": car_make_instances[4]},
        {"name": "Camry", "type": "Sedan", "year": 2023, "car_make": car_make_instances[4]},
        {"name": "Kluger", "type": "SUV", "year": 2023, "car_make": car_make_instances[4]},
    ]
    for data in car_model_data:
        CarModel.objects.get_or_create(
            name=data['name'],
            car_make=data['car_make'],
            defaults={'type': data['type'], 'year': data['year']}
        )
