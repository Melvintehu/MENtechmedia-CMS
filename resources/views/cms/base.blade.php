<div class="col-lg-12 space-inside-md bg-light shadow-xs space-outside-up-sm">
	<span class="inline-block space-inside-left-md" style="position: relative; bottom: 5px;">
		<i  class="material-icons font-xl space-inside-right-sm"> {{ $icon ?? 'group' }} </i> 
	</span>
	<h1 class="inline-block space-inside-right-md space-outside-down-sm text-color-dark text-bold text-uppercase letter-spacing-sm">{{ $title }}</h1>
	<read type="{{ $type }}"> </read>
</div>
<div class="col-lg-12  space-inside-md  bg-light shadow-xs space-outside-up-sm">
	<add  class="space-inside-sides-md" type="{{ $type }}"> 
			{{ $description ?? 'Beheer hier deze items' }}
	</add>
</div>
