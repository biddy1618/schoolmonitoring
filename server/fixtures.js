if (Counters.find().count() === 0) {

	Counters.insert({
		_id:'teacherId',
		seq:10000
	});

	Counters.insert({
		_id: 'studentId',
		seq:10000
	});
}

if (Meteor.users.find().count()==0) {
	Accounts.createUser({username:'admin',password:'admin',email:'admin@katev.kz',profile:{userType:'admin'}});
}

if (Branches.find().count()==0) {
	Branches.insert({
		_id:'01',
		kz_name: 'Алгебра',
		en_name: 'Algebra'
	});
	Branches.insert({
		_id:'02',
		kz_name: 'Физика',
		en_name: 'Physics'
	});
	Branches.insert({
		_id:'03',
		kz_name: 'Химия',
		en_name: 'Chemitstry'
	});
	Branches.insert({
		_id:'04',
		kz_name: 'Биология',
		en_name: 'Biology'
	});
	Branches.insert({
		_id:'05',
		kz_name: 'Информатика',
		en_name: 'Computer Science'
	});
	Branches.insert({
		_id:'06',
		kz_name: 'Қазақ тілі',
		en_name: 'Kazakh language'
	});
	Branches.insert({
		_id:'07',
		kz_name: 'Орыс тілі',
		en_name: 'Russian language'
	});
	Branches.insert({
		_id:'08',
		kz_name: 'Ағылшын тілі',
		en_name: 'English'
	});
	Branches.insert({
		_id:'09',
		kz_name: 'Қазақстан тарихы',
		en_name: 'Kazakh History'
	});
	Branches.insert({
		_id:'10',
		kz_name: 'География',
		en_name: 'Geography'
	});
	Branches.insert({
		_id:'11',
		kz_name: 'Дүниежүзілік тарих',
		en_name: 'World history'
	});
	Branches.insert({
		_id:'12',
		kz_name: 'Экономика',
		en_name: 'Economics'
	});
	Branches.insert({
		_id:'13',
		kz_name: 'Неміс тілі',
		en_name: 'German'
	});
	Branches.insert({
		_id:'14',
		kz_name: 'Француз тілі',
		en_name: 'French'
	});
	Branches.insert({
		_id:'15',
		kz_name: 'Құқық',
		en_name: 'Law'
	});
	Branches.insert({
		_id:'16',
		kz_name: 'Түрік тілі',
		en_name: 'Turkish language'
	});
	Branches.insert({
		_id:'17',
		kz_name: 'Экология',
		en_name: 'Ecology'
	});
	Branches.insert({
		_id:'18',
		kz_name: 'Социология',
		en_name: 'Sociology'
	});
	Branches.insert({
		_id:'18',
		kz_name: 'Психология',
		en_name: 'Psychology'
	});
	Branches.insert({
		_id:'18',
		kz_name: 'Технология',
		en_name: 'Science in Technology'
	});

}