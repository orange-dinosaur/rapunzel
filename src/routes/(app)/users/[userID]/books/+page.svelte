<script>
	export let data;

	const { user } = data;
</script>

<h1>THIS PAGE IS "BOOKS"</h1>

<ul>
	<li>
		<strong>Email:</strong>
		{user.email}
	</li>
	<li>
		<strong>Name:</strong>
		{user.name}
	</li>
	<li>
		<strong>ID: </strong>
		{user.$id}
	</li>
</ul>

<form method="post">
	<button type="submit">Log out</button>
</form>
