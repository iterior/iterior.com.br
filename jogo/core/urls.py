# coding: utf-8
from django.conf.urls import patterns, include, url

urlpatterns = patterns('jogo.core.views',
	url(r'^$', 'home', name='home'),
)