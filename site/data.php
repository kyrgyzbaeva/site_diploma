<?php
// Статические данные для макета

$patients = [
    [
        'id' => 1,
        'name' => 'Петров А.К.',
        'fullname' => 'Петров Алексей Константинович',
        'age' => 65,
        'diagnosis' => 'ИБС, гипертензия',
        'status' => 'normal',
        'hr' => 72,
        'bp' => '128/84',
        'spo2' => 97,
        'hr_color' => 'normal',
        'bp_color' => 'normal',
        'spo2_color' => 'normal'
    ],
    [
        'id' => 2,
        'name' => 'Сидорова Е.В.',
        'fullname' => 'Сидорова Елена Васильевна',
        'age' => 58,
        'diagnosis' => 'аритмия',
        'status' => 'warning',
        'hr' => 112,
        'bp' => '145/92',
        'spo2' => 95,
        'hr_color' => 'warning',
        'bp_color' => 'warning',
        'spo2_color' => 'normal'
    ],
    [
        'id' => 3,
        'name' => 'Николаев Г.Д.',
        'fullname' => 'Николаев Григорий Дмитриевич',
        'age' => 71,
        'diagnosis' => 'ХСН',
        'status' => 'critical',
        'hr' => 58,
        'bp' => '98/60',
        'spo2' => 89,
        'hr_color' => 'critical',
        'bp_color' => 'critical',
        'spo2_color' => 'warning'
    ]
];

$alerts = [
    [
        'patient_id' => 2,
        'patient_name' => 'Сидорова Е.В.',
        'param' => 'ЧСС',
        'value' => '112 уд/мин',
        'time' => '10:24',
        'status' => 'active',
        'color' => 'warning'
    ],
    [
        'patient_id' => 3,
        'patient_name' => 'Николаев Г.Д.',
        'param' => 'SpO2',
        'value' => '89%',
        'time' => '09:51',
        'status' => 'active',
        'color' => 'critical'
    ],
    [
        'patient_id' => 1,
        'patient_name' => 'Петров А.К.',
        'param' => 'ДАД',
        'value' => '>90',
        'time' => '26.10 22:10',
        'status' => 'confirmed',
        'color' => 'normal'
    ]
];

// Для истории событий
$history_events = [
    [
        'datetime' => '26.10.2023 14:30',
        'event' => 'Повышение ЧСС',
        'value' => '118 уд/мин',
        'comment' => 'После физической нагрузки'
    ],
    [
        'datetime' => '25.10.2023 09:15',
        'event' => 'Снижение SpO2',
        'value' => '91%',
        'comment' => 'Ночное событие, рекомендовано исследование'
    ]
];
?>