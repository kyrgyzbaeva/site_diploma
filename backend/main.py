from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="ТМониторинг API v1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PATIENTS = [
    {"id": "PT-1002", "name": "Калыс Асылканов", "age": "55 л.", "diagnosis": "ИБС, Стенокардия", "hr": 68, "bp": "135/85", "spo2": "98", "status": "Стабильно"},
    {"id": "PT-1003", "name": "Айаруу Алымбекова", "age": "70 л.", "diagnosis": "ХСН IIФ", "hr": 90, "bp": "140/90", "spo2": "89", "status": "Гипоксемия"},
    {"id": "PT-1004", "name": "Амина Калиева", "age": "48 л.", "diagnosis": "АГ I ст.", "hr": 72, "bp": "125/80", "spo2": "99", "status": "Стабильно"},
    {"id": "PT-1005", "name": "Эрмек Саматкулов", "age": "65 л.", "diagnosis": "Аритмия (ФП)", "hr": 105, "bp": "130/82", "spo2": "96", "status": "Тахикардия"},
]

class LoginReq(BaseModel):
    username: str
    password: str

class Comment(BaseModel):
    patient_id: str
    text: str

class PatientCreate(BaseModel):
    name: str
    age: str
    diagnosis: str
    hr: int
    bp: str
    spo2: str
    status: str

@app.post("/api/auth/login")
def login(req: LoginReq):
    if req.username == "admin" and req.password == "admin":
        return {"token": "mock-jwt-token", "doctor": "Асема Жамгырчиева", "role": "cardiologist"}
    raise HTTPException(status_code=401, detail="Неверный логин или пароль")

@app.get("/api/patients")
def get_patients():
    return PATIENTS

@app.get("/api/patients/{pid}")
def get_patient(pid: str):
    p = next((x for x in PATIENTS if x["id"] == pid), None)
    if not p:
        raise HTTPException(status_code=404, detail="Пациент не найден")
    return p

@app.post("/api/patients")
def create_patient(patient: PatientCreate):
    next_number = 1002 + len(PATIENTS)
    new_patient = {
        "id": f"PT-{next_number}",
        "name": patient.name,
        "age": patient.age,
        "diagnosis": patient.diagnosis,
        "hr": patient.hr,
        "bp": patient.bp,
        "spo2": patient.spo2,
        "status": patient.status,
    }
    PATIENTS.append(new_patient)
    return {"status": "created", "patient": new_patient}

@app.post("/api/comments")
def add_comment(c: Comment):
    return {"status": "saved", "patient": c.patient_id}