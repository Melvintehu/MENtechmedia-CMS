@extends('cms.master')

@section('content')
	<div class="col-lg-12  space-inside-md  bg-light shadow-xs space-outside-up-sm">

		<input-renderer-update id="{{$id}}"  type="{{$type}}" value="{{$object}}" identifier="update-{{$id}}"> </input-renderer-update>

	</div>

@endsection
